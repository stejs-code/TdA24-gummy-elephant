import {component$} from "@builder.io/qwik";
import {Link, useLocation} from "@builder.io/qwik-city";
import {Image} from "@unpic/qwik";
import type {LecturerType} from "~/app/zod";
import {LuUser} from "@qwikest/icons/lucide";
import type {NotificationsProps} from "~/components/navigation/notifications";
import {Notifications} from "~/components/navigation/notifications";

interface NavigationProps {
    user: LecturerType | undefined,
    notification: NotificationsProps
}

export const Navigation = component$<NavigationProps>(({user, notification}) => {
    const location = useLocation()

    return (
        <>
            <nav class={"w-full bg-white border-b border-slate-200 mb-2"}>
                <div class={"flex mx-auto max-w-6xl p-4 pb-3 items-center"}>
                    <Link href={"/"} prefetch={true}>
                        <Image
                            class={"pointer-events-none"}
                            src={"/images/logo.svg"}
                            width={80}
                            height={53}
                            alt={"Teacher Digital Agency Logo"}
                        />
                    </Link>
                    <ul class={"flex ml-auto items-center mr-2"}>
                        {(location.url.pathname.startsWith("/hub") || location.url.pathname.startsWith("/auth") || user) &&
                            <li>
                                <a href={(user ? "/auth/logout" : "/auth/login")}
                                   class={"flex items-center transition-colors hover:bg-slate-50/70 p-2 pr-4 rounded-xl"}>
                                    <div
                                        class={"aspect-square w-9 flex items-center justify-center rounded-md bg-primary-50 text-primary-300 font-semibold mr-4"}>
                                        {user
                                            ? ((user.first_name[0] || "") + (user.last_name[0] || "")).toUpperCase()
                                            : <LuUser class={"text-lg"}/>}
                                    </div>
                                    <p class={"leading-tight text-left"}>
                                    <span class={"font-semibold"}>
                                        {user
                                            ? [user.title_before, user.first_name, user.middle_name, user.last_name, user.title_after].join(" ")
                                            : "Nepřihlášen"}
                                    </span>

                                        {user && <>
                                            <br/>
                                            <span class={"text-slate-500"}>Lektor</span>
                                        </>}
                                    </p>
                                </a>
                            </li>
                        }

                        {user && <li class={"ml-4"}>
                            <Notifications notifications={notification.notifications} unread={notification.unread}/>
                        </li>}
                    </ul>
                </div>

            </nav>
        </>
    )
})