import {component$, useTask$} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import {Form, routeAction$, useNavigate} from "@builder.io/qwik-city";
import {PrimaryButton} from "~/components/ui/button";
import {postSession} from "~/app/session";
import {addOneDay} from "~/app/utils";
import {TextInput} from "~/components/ui/form";
import {comparePassword, getLecturerIndex} from "~/app/lecturer";
import {Context} from "~/app/context";

export default component$(() => {
    const action = useAuthSignIn()
    const navigate = useNavigate()


    useTask$(({track}) => {
        track(() => action.value)
        if (action.value?.status === "success") {
            navigate("/")
        }
    })

    return <>
        <div class={"px-4 mx-auto max-w-lg"}>
            <h1 class={"text-5xl sm:text-6xl font-display mb-4 sm:mb-12"}>Přihlášení</h1>
            <Form action={action} class={"flex flex-col gap-y-4"}>
                <TextInput name={"username"} placeholder={"Login"} autocomplete={"username"}/>
                <TextInput type={"password"} name={"password"} placeholder={"Heslo"} autocomplete={"current-password"}/>
                {action.value?.status === "fail" && <p class={"text-sm text-red-600"}>{action.value.message}</p>}
                <PrimaryButton type={"submit"}>
                    Přihlásit se
                </PrimaryButton>
            </Form>
        </div>
    </>
})

export const onGet: RequestHandler = (ev) => {
    if (ev.sharedMap.get("session")) {
        throw ev.redirect(307, "/")
    }
}

export const useAuthSignIn = routeAction$(async (data, event) => {
    const ctx = new Context(event)
    const login = data.username
    const password = data.password

    if (!login || !password) return {
        status: "fail",
        message: "Neznámý kód"
    }


    const response = await getLecturerIndex(ctx.meili).search("", {
        filter: [`login = ${login}`]
    })

    const user = response.hits[0]

    const isMatch = user.password ? await comparePassword(String(password), user.password) : false

    if (!isMatch) return {
        status: "fail",
        message: "Neplatné heslo"
    }

    const session = await postSession({
        user: user
    })

    event.cookie.set("session", session.id, {
        expires: addOneDay(),
        secure: false, // when https -> true
        path: "/"
    })

    return {
        status: "success"
    }
})