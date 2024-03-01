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

export const onGet: RequestHandler = async () => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    // cacheControl({
    //     // Always serve a cached response by default, up to a week stale
    //     staleWhileRevalidate: 60 * 60 * 24 * 7,
    //     // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    //     maxAge: 5,
    // });
};

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
