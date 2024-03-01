import {component$, useSignal} from "@builder.io/qwik";
import {PrimaryButton} from "~/components/ui/button";
import {PasswordInput} from "~/components/ui/form";
import {Modal, ModalContent, ModalFooter, ModalHeader} from "@qwik-ui/headless";
import {LuArrowBigLeft, LuX} from "@qwikest/icons/lucide";
import {formAction$, useForm, valiForm$} from "@modular-forms/qwik";
import * as v from 'valibot';

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
    const [, { Form, Field }] = useForm<PasswordForm>({
        loader: { value: { newPasswordAgain: '', password: '', newPassword: "" } },
        validate: valiForm$(PasswordSchema),
        action: useFormAction(),
    });

    return (
        <>

            <div class={"mt-20 px-4 mx-auto w-full max-w-lg"}>
                <h1 class={"text-5xl sm:text-5xl font-display mb-4 sm:mb-10"}>Změnit heslo</h1>
                <Form>
                    <Field name="password">
                        {(field, props) => <PasswordInput error={field.error} label={"Aktualní heslo"} placeholder={"Aktualní heslo"}/>
                            }
                    </Field>
                    <Field name="newPassword">
                        {(field, props) => <PasswordInput error={field.error} placeholder={"Nové heslo"}/>}
                    </Field>
                    <Field name="newPasswordAgain">
                        {(field, props) => <PasswordInput error={field.error} placeholder={"Nové heslo znovu"}/>}
                    </Field>
                    <PrimaryButton type={"submit"} onClick$={() => {
                        popUpVisible.value = true
                    }}>
                        Změnit heslo
                    </PrimaryButton>
                </Form>
            </div>
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
                        Změnit heslo
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

export const useFormAction = formAction$<PasswordForm>((values) => {
    // Runs on server
}, valiForm$(PasswordSchema));