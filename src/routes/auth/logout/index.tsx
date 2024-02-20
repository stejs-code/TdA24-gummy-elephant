import type {RequestHandler} from "@builder.io/qwik-city";
import {deleteSession} from "~/app/session";

export const onRequest: RequestHandler = async (event) => {
    const session = event.sharedMap.get("session")
    if (session) {
        event.cookie.delete("session", {path: "/"})

        await deleteSession(session.id)
    }

    throw event.redirect(302, "/auth/login")
}