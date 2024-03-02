import type {QRL} from "@builder.io/qwik";
import {$, component$, useContext, useSignal} from "@builder.io/qwik";
import type {NotificationType} from "~/app/zod";
import {LuBell} from "@qwikest/icons/lucide";
import {cn, formatTimeAgo} from "~/app/utils";
import {useOutsideAlerter} from "~/components/hooks/outsideClick";
import {NavContext} from "~/components/navigation/navigation";
import {server$, useNavigate} from "@builder.io/qwik-city";
import {Context} from "~/app/context";
import {makeNotificationRead} from "~/app/notification";
import {getReservation} from "~/app/reservation";
import {ApiError} from "~/app/apiError";
import {getDateTimeFromDate} from "~/components/calendar/calendar";

export interface NotificationsProps {
    notifications: NotificationType[],
    unread: number
}

export const handleNot = server$(async function (reservationID, notID) {
    const ctx = new Context(this)
    const reservation = await getReservation(ctx, reservationID);
    await makeNotificationRead(ctx, notID);
    return reservation
})

export const Notifications = component$(() => {
    const store = useContext(NavContext);
    const notificationsPopup = useSignal<HTMLElement>()
    const popupVisible = useSignal(false)
    const navigate = useNavigate()

    useOutsideAlerter(notificationsPopup, $(() => {
        popupVisible.value = false
    }))


    return <div class={"relative"} ref={notificationsPopup}>
        <button name={"notification-bell"}
                class={"p-2 rounded-lg transition-colors hover:bg-slate-50"}
                onClick$={() => popupVisible.value = !popupVisible.value}>
                <span class={"relative"}>
                    {store.notification.unread
                        ? <span
                            class={"block absolute -top-1 translate-x-4 bg-red-500 aspect-square rounded-full w-2 h-2"}/>
                        : ""
                    }
                    <LuBell class={"text-2xl"}/>
                </span>
        </button>

        <div
            class={cn("fixed sm:absolute z-50 top-18 sm:top-8 right-4 left-4 sm:left-auto sm:right-0 sm:w-80 rounded-2xl border-2 border-slate-100 shadow-2xl flex flex-col bg-white pt-8 px-6 transition-all ", popupVisible.value ? "visible opacity-100 translate-y-1" : "invisible opacity-0 -translate-y-2")}>
            <h3 class={"font-display text-3xl mb-2"}>
                <LuBell class={"text-xl inline mr-3"}/>
                Notifikace
            </h3>
            <div class={"h-80 overflow-y-scroll no-scrollbar"}>
                {store.notification.notifications.map(i => (
                    <Notification onClick$={$(async () => {
                        const res = await handleNot(i.reservation, i.uuid);
                        if (!(res instanceof ApiError)) {
                            navigate(`/hub/reservations/day-view/${getDateTimeFromDate(new Date(res.dateAt))}`)
                        }
                    })} key={i.uuid} data={i}/>
                ))}
                {!store.notification.notifications.length && <p class={"w-full text-slate-600"}>
                    Stále žádné notifikace {" 😢"}
                </p>}
            </div>
        </div>

        {/*{reservationStore.data && <Popup*/}
        {/*     modalVisible={modalVisible}*/}
        {/*     uuid={reservationStore.data.uuid}*/}
        {/*     time={[reservationStore.data.hourStart, reservationStore.data.hourEnd]}*/}
        {/*     first_name={reservationStore.data.student.first_name}*/}
        {/*     last_name={reservationStore.data.student.last_name}*/}
        {/*     tagName={reservationStore.data.tags[0].name}*/}
        {/*     date={reservationStore.data.dateAt}*/}
        {/*     email={reservationStore.data.student.email}*/}
        {/*     meetingType={reservationStore.data.meetingType}*/}
        {/*     note={reservationStore.data.note}*/}
        {/*     phone={reservationStore.data.student.telephone}*/}
        {/*/>}*/}

    </div>
})


export const Notification = component$<{ data: NotificationType, onClick$: QRL<() => void> }>(({data, onClick$}) => {
    return <button onClick$={() => {
        return onClick$()
        // const res = await handleNot(data.uuid);
        // if ((res instanceof ApiError)) {
        //     console.log(1);
        // } else {
        // }
    }}>
        <div key={data.uuid} class={"border-b border-slate-200 py-4 flex"}>
            <div class={"w-4 pt-2 mr-2"}>
                {!data.read && <span class={"block bg-red-500 aspect-square rounded-full w-2.5 h-2.5"}></span>}
            </div>
            <div class={"flex flex-col items-start"}>
                <h4 class={"font-bold"}>Nová rezervace</h4>
                <p>{data.data.message}</p>
                <span class={"text-slate-400 text-sm"}>{formatTimeAgo(new Date(data.created_at))}</span>
            </div>
        </div>
    </button>
})

















