import {component$,  useTask$} from "@builder.io/qwik";
import type { RequestHandler} from "@builder.io/qwik-city";
import {Form, routeAction$, useNavigate} from "@builder.io/qwik-city";
import {isDev} from "@builder.io/qwik/build";
import {PrimaryButton} from "~/components/ui/button";
import {Lecturer} from "~/app/lecturer";
import {postSession} from "~/app/session";
import {ApiError} from "~/app/apiError";
import {addOneDay} from "~/app/utils";

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
        <Form action={action}>
            <input type={"text"} name={"username"} placeholder={"Login"}/>
            <input type={"password"} name={"password"} placeholder={"Heslo"}/>
            {action.value?.status === "fail" && <p class={"text-sm text-red-600"}>{action.value.message}</p>}
            <PrimaryButton type={"submit"}>
                Přihlásit se
            </PrimaryButton>
        </Form>
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

    const response = await lecturer.search("",{
        filter: [`login = ${login}`]
    })



    if (response instanceof ApiError || !response.hits.length) return {
        status: "fail",
        message: "Neznámý uživatel"
    }

    const user = response.hits[0]

    const session = await postSession( {
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