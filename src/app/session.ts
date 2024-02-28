import {z} from "zod";
import type {RequestHandler} from "@builder.io/qwik-city";
import {isDev} from "@builder.io/qwik/build";
import {lecturerZod} from "~/app/zod";
import {redis} from "~/app/redis";

export const zSession = z.object({
    id: z.string().uuid(),
    user: lecturerZod,
})

export type Session = z.infer<typeof zSession>

export async function getSession(id: string): Promise<Partial<Session>> {
    const response = await redis().get(`session:${id}`)

    if (!response) throw new Error("Relace nenalezena")

    const untypedSession = JSON.parse(response)

    const parse = zSession.safeParse(untypedSession)

    if (!parse.success) {
        console.log(parse.error.errors)
        console.error(`Session with incorrect type, id: ${id}`)

        // It's already bad, but life goes on, so deal with it :(
        return untypedSession as Session
    }

    return parse.data
}

export async function postSession(data: Partial<Session>) {

    const previousDocument: Partial<Session> = data.id !== undefined ? await getSession(data.id) : {}
    const id = data.id ?? crypto.randomUUID()

    const session = {
        ...previousDocument,
        ...data,
        id: id
    }

    await redis().set(`session:${id}`, JSON.stringify(session, null, isDev ? 4 : 0))
    await redis().EXPIRE(`session:${id}`, 60 * 60 * 24, "NX")

    return session
}

export async function deleteSession(id: string) {
    return await redis().del(`session:${id}`)
}


export const authenticateRoute: RequestHandler = (ev) => {
    if (!ev.sharedMap.get("session")) {
        throw ev.redirect(302, "/login")
    }
}