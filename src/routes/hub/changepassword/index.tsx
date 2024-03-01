import {component$, useSignal, $} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {PasswordInput} from "~/components/ui/form";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {LuX} from "@qwikest/icons/lucide";
import {formAction$, useForm, valiForm$} from "@modular-forms/qwik";
import * as v from 'valibot';
import { Context } from "~/app/context";
import type { Session} from "~/app/session";
import { postSession } from "~/app/session";
import { comparePassword, encryptPassword, getLecturerIndex, updateLecturer } from "~/app/lecturer";
import { addOneDay } from "~/app/utils";

const PasswordSchema = v.object({
    password: v.string(),
    newPassword: v.string([
        v.minLength(4, 'Vaše heslo musí obsahovat minimálně 4 charaktery'),
    ]),
    newPasswordAgain: v.string([
        v.minLength(4, 'Vaše heslo musí obsahovat minimálně 4 charaktery'),
    ])
});

type PasswordForm = v.Input<typeof PasswordSchema>;
export default component$(() => {

    const popUpVisible = useSignal(false)
    const [passwordForm, { Form, Field }] = useForm<PasswordForm>({
        loader: { value: { newPasswordAgain: '', password: '', newPassword: "" } },
        validate: $(async(values) => {
            const response = await valiForm$(PasswordSchema)(values);

            if(values.newPassword !== values.newPasswordAgain){
                response.newPasswordAgain = "Hesla se neshodují."
            }

            return response;
        }),
        action: useFormAction(),
    });

    return (
        <>

            <div class={"mt-20 px-4 mx-auto w-full max-w-lg"}>
                <h1 class={"text-5xl sm:text-5xl font-display mb-4 sm:mb-10"}>Změnit heslo</h1>
w                <Form autoComplete={"on"}>
                    <Field name="password">
                        {(field, props) => <PasswordInput {...props} error={field.error} label={"Aktualní heslo"} placeholder={"Aktualní heslo"}/>
                            }
                    </Field>
                    <Field name="newPassword">
                        {(field, props) => <PasswordInput {...props} autocomplete={"new-password"} error={field.error} placeholder={"Nové heslo"}/>}
                    </Field>
                    <Field name="newPasswordAgain">
                        {(field, props) => <PasswordInput {...props} autocomplete={"new-password"} error={field.error} placeholder={"Nové heslo znovu"}/>}
                    </Field>

                    {passwordForm.response.status === "error" && <p class={"text-sm text-red-600"}>{passwordForm.response.message}</p>}
                    {passwordForm.response.status === "success" && <p class={"text-sm text-green-600"}>{passwordForm.response.message}</p>}
                    <PrimaryButton type={"button"} onClick$={() => {
                        popUpVisible.value = true
                    }}>
                        Změnit heslo
                    </PrimaryButton>

                    <Modal
                        alert
                        bind:show={popUpVisible}
                        class="rounded-md rounded-base max-w-[25rem] p-[28px] shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
                    >
                        <ModalHeader>
                            <h2 class="mb-2 text-lg font-bold ">Změnit heslo</h2>
                        </ModalHeader>
                        <ModalContent class="mb-2 pb-4 pt-2">
                            <p class="leading-5">Opravdu si přejete změnit heslo?</p>
                        </ModalContent>
                        <ModalFooter class="flex justify-end gap-4">
                            <button
                                type={"button"}
                                class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-base border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                onClick$={() => (popUpVisible.value = false)}
                            >
                                <span class={"flex items-center"}>
                                    <p>Zrušit</p>
                                </span>
                            </button>
                            <PrimaryButton
                                type={"submit"}
                                class="text-primary-500 bg-destructive focus:ring-destructive text-destructive-foreground focus-visible:destructive-foreground/90 rounded-base border border-none px-4 py-[10px] outline-none focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                onClick$={() => (popUpVisible.value = false)}
                            >
                                Změnit heslo
                            </PrimaryButton>
                        </ModalFooter>
                        <button
                            type={"button"}
                            onClick$={() => (popUpVisible.value = false)}
                            class="absolute right-6 top-[26px]"
                        >
                            <div class="p-1 cursor-pointer"><LuX/></div>
                        </button>
                    </Modal>
                </Form>
            </div>
        </>

    )
})

export const useFormAction = formAction$<PasswordForm>(async (values, event) => {
    const ctx = new Context(event)
    const newPassword = values.newPassword
    const password = values.password
    const newHashedPassword = await encryptPassword(newPassword)
    const s = event.sharedMap.get("session") as Session | undefined
    if(s === undefined) return {status: "error", message: "Musíte být přihlášeni."}
    const response = await getLecturerIndex(ctx.meili).search("", {
        filter: [`username = ${s.user.username}`]
    })
    const user = response.hits[0]
    const isMatch = (user.password && password) ? await comparePassword(String(password), user.password) : false

    if(!isMatch){
        return {status: "error", message: "Špatné heslo."}
    }else{
        await updateLecturer(ctx, user.uuid, {password: newPassword})
        const session = await postSession({
            user: {...user, password: newHashedPassword}
        })

        event.cookie.set("session", session.id, {
            expires: addOneDay(),
            secure: false, // when https -> true
            path: "/"
        })

        return {status: "success", message: "Heslo změněno."}
    }

}, valiForm$(PasswordSchema));
