import type {RequestHandler} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import {initializeRedisIfItIsUndefined} from "~/app/redis";
import type {Session} from "~/app/session";
import {deleteSession, getSession} from "~/app/session";

export const onRequest: RequestHandler = async (ev) => {
    // TODO: secured paths
    await initializeRedisIfItIsUndefined(ev.env)

    const sessionId = ev.cookie.get("session")?.value

    if (sessionId) {
        try {
            ev.sharedMap.set("session", await getSession(sessionId))
        } catch (e) {
            // Reset session
            console.log(`Forcing session reset, id: ${sessionId}`)

            await deleteSession(sessionId)
            ev.cookie.delete("session")
        }
    }else{
        const url = ev.request.url
        if(url.includes("/hub") || url.includes("/exportCal")){
            throw ev.redirect(302, "/")
        }
    }
}

export const useAuthSession = routeLoader$(({sharedMap}) => {
    return sharedMap.get("session") as Session | undefined
})
