import {$, component$, useSignal} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {Image} from "@unpic/qwik";
import type {LecturerType} from "~/app/zod";
import {LuCog, LuLogOut, LuUser} from "@qwikest/icons/lucide";
import type {NotificationsProps} from "~/components/navigation/notifications";
import {Notifications} from "~/components/navigation/notifications";
import {cn} from "~/app/utils";
import {useOutsideAlerter} from "~/components/hooks/outsideClick";

interface NavigationProps {
    user: LecturerType | undefined,
    notification: NotificationsProps
}

export const Navigation = component$<NavigationProps>(({user, notification}) => {
    const userPopupVisible = useSignal(false)
    const popup = useSignal<HTMLElement>()
    useOutsideAlerter(popup, $(() => userPopupVisible.value = false))

    return (
        <div class={"sticky top-0 z-30"}>
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
                        { user &&
                            <li class={"relative"}>
                                <button
                                    onClick$={() => userPopupVisible.value = true}
                                    class={"flex items-center transition-all border border-transparent hover:border-slate-200 p-2 pr-4 rounded-xl"}>
                                    <div
                                        class={"aspect-square w-9 flex items-center justify-center rounded-md bg-primary-50 text-primary-300 font-semibold mr-4"}>
                                        {((user.first_name[0] || "") + (user.last_name[0] || "")).toUpperCase()}
                                        {/*{user*/}
                                        {/*    ? ((user.first_name[0] || "") + (user.last_name[0] || "")).toUpperCase()*/}
                                        {/*    : <LuUser class={"text-lg"}/>}*/}
                                    </div>
                                    <p class={"leading-tight text-left"}>
                                        <span class={"font-semibold"}>
                                            {/*{user*/}
                                            {/*    ? [user.title_before, user.first_name, user.middle_name, user.last_name, user.title_after].join(" ")*/}
                                            {/*    : "Nepřihlášen"}*/}
                                            {[user.title_before, user.first_name, user.middle_name, user.last_name, user.title_after].join(" ")}
                                        </span>

                                        {/*{user && <>*/}
                                            <br/>
                                            <span class={"text-slate-500"}>Lektor</span>
                                        {/*</>}*/}
                                    </p>
                                </button>
                                <div
                                    ref={popup}
                                    class={cn("absolute z-50 right-0 invisible transition-all opacity-0 -translate-y-2 w-48 bg-white shadow-lg border-2 border-slate-100 rounded-xl p-2 flex flex-col items-stretch", userPopupVisible.value && "opacity-100 translate-y-1 visible")}>
                                    <Link href={`/hub/settings`}
                                          class={"hover:bg-slate-50 transition-colors px-5 py-2 rounded-lg"}>
                                        <LuCog class={"-translate-x-2 text-xl mb-1 inline"}/> Nastavení
                                    </Link>
                                    <Link href={`/lecturer/${user.uuid}`}
                                          class={"hover:bg-slate-50 transition-colors px-5 py-2 rounded-lg"}>
                                        <LuUser class={"-translate-x-2 text-xl mb-1 inline"}/> Můj profil
                                    </Link>
                                    <form class={"flex"} action="/logout" method={"POST"}>
                                        <button
                                            type={"submit"}
                                            class={"w-full hover:bg-red-50 text-red-600 transition-colors rounded-lg text-left px-5 py-2"}>
                                            <LuLogOut class={"-translate-x-2 text-xl mb-1 inline"}/> Odhlásit se
                                        </button>
                                    </form>
                                </div>
                            </li>
                        }

                        {user && <li class={"ml-4"}>
                            <Notifications notifications={notification.notifications} unread={notification.unread}/>
                        </li>}
                    </ul>
                </div>

            </nav>
        </div>
    )
})