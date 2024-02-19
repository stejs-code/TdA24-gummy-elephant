import {component$, useTask$} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import {Form, routeAction$, useNavigate} from "@builder.io/qwik-city";
import {isDev} from "@builder.io/qwik/build";
import {PrimaryButton} from "~/components/ui/button";
import {Lecturer} from "~/app/lecturer";
import {postSession} from "~/app/session";
import {ApiError} from "~/app/apiError";
import {addOneDay} from "~/app/utils";
import {TextInput} from "~/components/ui/form";

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
    const login = data.username
    const password = data.password

    if (!login || !password) return {
        status: "fail",
        message: "Neznámý kód"
    }

    const lecturer = Lecturer.use(event.env)

    const response = await lecturer.search("", {
        filter: [`login = ${login}`]
    })


    if (response instanceof ApiError || !response.hits.length) return {
        status: "fail",
        message: "Neznámý uživatel"
    }

    const user = response.hits[0]
    console.log(user)
    console.log(1, user.password)
    console.log(2, password)
    const isMatch = user.password ? await Lecturer.comparePassword(String(password), user.password) : false

    if (!isMatch)  return {
        status: "fail",
        message: "Neplatné heslo"
    }

    const session = await postSession({
        user: user
    })

    event.cookie.set("session", session.id, {
        expires: addOneDay(),
        secure: !isDev,
        path: "/"
    })

    return {
        status: "success"
    }
})