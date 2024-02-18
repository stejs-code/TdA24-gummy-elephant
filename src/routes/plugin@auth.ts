import type {RequestHandler} from "@builder.io/qwik-city";
import {routeLoader$} from "@builder.io/qwik-city";
import {initializeRedisIfItIsUndefined} from "~/app/redis";
import {deleteSession, getSession, Session} from "~/app/session";

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
    }
}

export const useAuthSession = routeLoader$(({sharedMap}) => {
    return sharedMap.get("session") as Session | undefined
})
