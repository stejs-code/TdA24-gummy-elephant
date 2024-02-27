import {$, component$, useSignal} from "@builder.io/qwik";
import type {NotificationType} from "~/app/zod";
import {LuBell} from "@qwikest/icons/lucide";
import {cn, formatTimeAgo} from "~/app/utils";
import {useOutsideAlerter} from "~/components/hooks/outsideClick";

export interface NotificationsProps {
    notifications: NotificationType[],
    unread: number
}

export const Notifications = component$<NotificationsProps>(({notifications}) => {
    const notificationsPopup = useSignal<HTMLElement>()
    const popupVisible = useSignal(false)

    useOutsideAlerter(notificationsPopup, $(() => {
        popupVisible.value = false
    }))

    return (
        <>
            <div class={"relative"} ref={notificationsPopup}>
                <button class={"p-2 rounded-lg transition-colors hover:bg-slate-50"}
                        onClick$={() => popupVisible.value = true}>
                    <span class={"relative"}>
                <span
                    class={"block absolute -top-1 -right-0 bg-red-500 aspect-square rounded-full w-2 h-2"}>
                </span>
                <LuBell class={"text-2xl"}/>

                </span>
                </button>

                <div
                    class={cn("absolute top-8 -right-0 w-80 rounded-2xl border-2 border-slate-100 shadow-2xl flex flex-col bg-white pt-8 px-6 transition-all ", popupVisible.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")}>
                    <h3 class={"font-display text-3xl mb-2"}>
                        <LuBell class={"text-xl inline mr-3"}/>
                        Notifikace
                    </h3>
                    <div class={"h-80 overflow-y-scroll no-scrollbar"}>
                        {notifications.map(i => (
                            <div key={i.uuid} class={"border-b border-slate-200 py-4 flex"}>
                                <div class={"w-4 pt-2 mr-2"}>
                                    {!i.read && <span
                                        class={"block bg-red-500 aspect-square rounded-full w-2.5 h-2.5"}>
                                </span>}
                                </div>
                                <div>
                                    <h4 class={"font-bold"}>Nová rezervace</h4>
                                    <p>{i.data.message}</p>
                                    <span
                                        class={"text-slate-400 text-sm"}>{formatTimeAgo(new Date(i.created_at))}</span>
                                </div>
                            </div>
                        ))}
                        {!notifications.length && <p class={"w-full text-slate-600"}>
                            Stále žádné notifikace {" 😢"}
                        </p>}
                    </div>
                </div>
            </div>
        </>
    )
})