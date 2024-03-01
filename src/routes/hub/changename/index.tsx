import {component$, useSignal} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {PasswordInput, TextInput} from "~/components/ui/form";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {LuArrowBigLeft, LuX} from "@qwikest/icons/lucide";
import {formAction$, useForm, valiForm$} from "@modular-forms/qwik";
import * as v from 'valibot';
import { comparePassword, getLecturerIndex, updateLecturer } from "~/app/lecturer";
import { Context } from "~/app/context";
import { Session, postSession } from "~/app/session";
import { addOneDay } from "~/app/utils";

const NameSchema = v.object({
    password: v.string(),
    newUsername: v.string([
        v.minLength(2, 'Vaše přihlašovací jméno musí mít alespoň 2 znaky'),
    ]),

});


type NameForm = v.Input<typeof NameSchema>;


export default component$(() => {
    const popUpVisible = useSignal(false)
    const [nameForm, { Form, Field }] = useForm<NameForm>({
        loader: {value: {password: '', newUsername: ''}},
        validate: valiForm$(NameSchema),
        action: useFormAction(),
    });
    return (
        <>
            <div class={"mt-20 px-4 mx-auto w-full max-w-lg"}>
                <h1 class={"text-5xl sm:text-5xl font-display mb-4 sm:mb-10"}>Změnit přihlašovací jméno</h1>
                {nameForm.response && <p>{nameForm.response.message}</p>}
                <Form>
                    <Field name="newUsername">
                        {(field, props) => <TextInput {...props} error={field.error} type={"text"} name={"newUsername"} placeholder={"Nové přihlašovací jméno"}/>}
                    </Field>
                    <Field name="password">
                        {(field, props) => <PasswordInput {...props} error={field.error} name={"password"} placeholder={"Moje stávající heslo"}/>}
                    </Field>
                    {nameForm.response.status === "error" && <p class={"text-sm text-red-600"}>{nameForm.response.message}</p>}
                    {nameForm.response.status === "success" && <p class={"text-sm text-green-600"}>{nameForm.response.message}</p>}
                    <PrimaryButton type={"submit"} onClick$={() => {
                        popUpVisible.value = true
                    }}>
                        Změnit přihlašovací jméno
                    </PrimaryButton>
                </Form>
            </div>
            <Modal
                alert
                bind:show={popUpVisible}
                class="rounded-md rounded-base max-w-[25rem] p-[28px] shadow-md backdrop:backdrop-blur backdrop:backdrop-brightness-50 dark:backdrop:backdrop-brightness-100"
            >
                <ModalHeader>
                    <h2 class="mb-2 text-lg font-bold ">Změnit přihlašovací jméno</h2>
                </ModalHeader>
                <ModalContent class="mb-2 pb-4 pt-2">
                    <p class="leading-5">Opravdu si přejete změnit přihlašovací jméno?</p>
                </ModalContent>
                <ModalFooter class="flex justify-end gap-4">
                    <button
                        class="bg-muted text-muted-foreground focus:ring-ring ring-offset-background focus-visible:ring-ring hover:bg-accent/90 hover:text-accent-foreground rounded-base border border-none px-4 py-[10px] outline-none transition-colors focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
                    >
                        <span class={"flex items-center"}>
                            <LuArrowBigLeft/>
                            <p>Zpět</p>
                        </span>
                    </button>
                    <button
                        class="text-primary-500 bg-destructive focus:ring-destructive text-destructive-foreground focus-visible:destructive-foreground/90 rounded-base border border-none px-4 py-[10px] outline-none focus:ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        onClick$={() => (popUpVisible.value = false)}
                    >
                        Změnit přihlašovací jméno
                    </button>
                </ModalFooter>
                <button
                    onClick$={() => (popUpVisible.value = false)}
                    class="absolute right-6 top-[26px]"
                >
                    <div class="p-1 cursor-pointer"><LuX/></div>
                </button>
            </Modal>

        </>

    )
})

export const useFormAction = formAction$<NameForm>(async (values, event) => {
    const ctx = new Context(event)
    const newUsername = values.newUsername
    const password = values.password 
    const session = event.sharedMap.get("session") as Session | undefined
    
    if(session === undefined) return {status: "error", message: "Musíte být přihlášeni."}

    const response = await getLecturerIndex(ctx.meili).search("", {
        filter: [`username = ${session.user.username}`]
    })

    const user = response.hits[0]
    const isMatch = (user.password && password) ? await comparePassword(String(password), user.password) : false
    if(!isMatch){
        return {status: "error", message: "Špatné heslo."}
    }else{
        await updateLecturer(ctx, user?.uuid, {username: newUsername})
        const session = await postSession({
            user: {...user, username: newUsername}
        })

        event.cookie.set("session", session.id, {
            expires: addOneDay(),
            secure: false, // when https -> true
            path: "/"
        })

        return {status: "success", message: "Přihlašovací jméno změněno."}
    }

}, valiForm$(NameSchema));
