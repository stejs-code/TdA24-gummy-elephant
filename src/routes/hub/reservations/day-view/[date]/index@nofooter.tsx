import {$, component$, useSignal, useStore, useTask$} from "@builder.io/qwik";
import {dayKey, getDateTimeFromDate, getMonthView, getSurroundingDaysView} from "~/components/calendar/calendar";
import {capitalizeFirstLetter, cn} from "~/app/utils";
import {routeAction$, routeLoader$} from "@builder.io/qwik-city";
import {Context} from "~/app/context";
import type {Session} from "~/app/session";
import type {ReservationType} from "~/app/zod";
import {PrimaryButton} from "~/components/ui/button";
import {DayViewCell} from "~/components/reservations/dayviewcell";
import {getLecturerReservations} from "~/app/reservation";
import {ApiError} from "~/app/apiError";
import {Change, ChangeMobile} from "~/components/reservations/change";
import {Popup} from "~/components/reservations/popup";

//const store = useContext(CalendarContext);

export default component$(() => {
    const data = useDayView()
    const action = useGetMonthView()

    const modalVisible = useSignal(false)

    const store = useStore({
        monthDays: data.value.monthDays,
        dayReservations: data.value.dayReservations,
        date: data.value.date,
        currentModal: undefined as (undefined | ReservationType)
    }, {deep: true})


    useTask$(({track}) => {
        track(() => action.value)

        if (action.value?.success) {
            store.dayReservations = action.value.dayReservations
            store.monthDays = action.value.monthDays
            store.date = action.value.date
            window.history.replaceState({}, "", `/hub/reservations/day-view/${getDateTimeFromDate(store.date)}`);
        }
    })


    const openReservation = $((reservation: ReservationType) => {
        store.currentModal = reservation
    })

    return (
        <div class={"px-4"}>
            {store.currentModal && <>
                <Popup
                    onClose$={$(async (reload: boolean) =>{
                        setTimeout(() => {
                            store.currentModal = undefined
                        }, 100)
                        if (reload) {
                            await action.submit({
                                date: store.date
                            })
                        }
                    })}
                    data={store.currentModal}
                    modalVisible={modalVisible}/>
            </>}
            <div class="lg:flex h-full max-h-[calc(100vh_-_120px)] lg:flex-col mt-2">
                <header
                    class="flex-shrink-0 flex flex-none items-center justify-between py-4">
                    <div>
                        <h1 class="text-3xl font-display font-semibold leading-6 text-gray-900">
                            <time dateTime={getDateTimeFromDate(store.date)} class="sm:hidden">
                                {capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }).format(store.date))}
                            </time>
                            <time dateTime={getDateTimeFromDate(store.date)} class="hidden sm:inline">
                                {capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }).format(store.date))}
                            </time>
                        </h1>
                    </div>
                    <div class="flex items-center">
                        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                            <button type="button"
                                    onClick$={() => {
                                        return action.submit({
                                            date: new Date(store.date.setDate(store.date.getDate() - 1))
                                        })
                                    }}
                                    class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                                <span class="sr-only">Previous day</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <button type={"button"}
                                    onClick$={() => {
                                        return action.submit({
                                            date: new Date()
                                        })
                                    }}
                                    class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Dnes
                            </button>
                            <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
                            <button type={"button"}
                                    onClick$={() => {
                                        return action.submit({
                                            date: new Date(store.date.setDate(store.date.getDate() + 1))
                                        })
                                    }}
                                    class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                                <span class="sr-only">Další</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>

                        <div class="hidden md:ml-4 md:flex md:items-center">
                            <Change date={store.date} type={"Denní"}/>
                            <div class="ml-3 mr-3 h-6 w-px bg-gray-300"></div>
                            <a href={"/exportCal"}>
                                <PrimaryButton>
                                    Exportovat
                                </PrimaryButton>
                            </a>
                        </div>
                        <ChangeMobile date={store.date} type={"Denní"}/>
                    </div>
                </header>

                <div
                    class="isolate flex flex-auto overflow-hidden bg-white border border-gray-200 rounded-md h-full max-h-[calc(100vh_-_180px)]">
                    <div class="flex flex-auto flex-col overflow-y-scroll">
                        <div
                            class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden">
                            {getSurroundingDaysView(store.date).map(i => (

                                <button
                                    type="button"
                                    key={i.dateTime}
                                    onClick$={() => {
                                        return action.submit({
                                            date: new Date(i.dateTime)
                                        })
                                    }}
                                    class="flex flex-col items-center pb-1.5 pt-3">
                                    <span>{i.short}</span>
                                    <span class={cn(
                                        "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900",
                                        i.selected && "bg-gray-900 text-white",
                                        i.today && "text-primary-300",
                                        i.today && i.selected && "bg-primary-300 text-white"
                                    )}>
                                        {i.dayN}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div class="flex w-full flex-auto">
                            <div class="w-14 flex-none bg-white ring-1 ring-gray-100"></div>
                            <div class="grid flex-auto grid-cols-1 grid-rows-1">
                                <div class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                                     style="grid-template-rows: repeat(12, minmax(4rem, 1fr)) 1rem">
                                    <div>
                                        <div
                                            class="-ml-14 mt-1 w-14 pr-2 text-right text-xs leading-5 text-gray-400">8:00
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">9:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">10:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">11:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">12:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">13:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">14:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">15:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">16:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">17:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">18:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">19:00
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="-ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">20:00
                                        </div>
                                    </div>
                                </div>

                                <ol class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                                    style="grid-template-rows: repeat(12, minmax(0rem, 1fr)) 1rem">
                                    {store.dayReservations.map(i => (
                                        <li key={`${i.uuid}-${i.hourStart}-${i.hourEnd}`} class="relative mt-px flex"
                                            style={`grid-row: ${i.hourStart - 7} / ${i.hourEnd - 7}`}>
                                            <button
                                                onClick$={() => {
                                                    openReservation(i)
                                                }}
                                                class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-primary-50 transition-colors p-2 text-xs leading-5 hover:bg-blue-100">
                                                <p class="order-1 font-semibold text-blue-700 text-lg">{i.student.first_name} {i.student.last_name}</p>
                                                <p class="order-1 text-blue-700">{i.student.email}</p>
                                                <p class="text-blue-500 group-hover:text-blue-700">
                                                    <time
                                                        dateTime={`${getDateTimeFromDate(store.date)}T${`${i.hourStart}:00`}`}>{i.hourStart}:00
                                                    </time>
                                                </p>
                                            </button>
                                        </li>
                                    ))}
                                    <li></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                        <div class="flex items-center text-center text-gray-900">
                            <button
                                onClick$={() => {
                                    return action.submit({
                                        date: new Date(store.date.setMonth(store.date.getMonth() - 1))
                                    })
                                }}
                                type="button"
                                class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Previous month</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                            <div class="flex-auto text-sm font-semibold">
                                {capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
                                    month: "long",
                                    year: "numeric"
                                }).format(store.date))}
                            </div>
                            <button
                                onClick$={() => {
                                    return action.submit({
                                        date: new Date(store.date.setMonth(store.date.getMonth() + 1))
                                    })
                                }}
                                type="button"
                                class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Next month</span>
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <div class="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                            <div>Po</div>
                            <div>Út</div>
                            <div>St</div>
                            <div>Čt</div>
                            <div>Pá</div>
                            <div>So</div>
                            <div>Ne</div>
                        </div>
                        <div
                            class="rounded-lg isolate  grid grid-cols-7 gap-px bg-gray-200 ring-1 ring-gray-200 text-sm shadow overflow-hidden">
                            {store.monthDays.map(i => (
                                <DayViewCell
                                    onClick$={$(async () => {
                                        await action.submit({
                                            date: i.date
                                        })
                                    })}
                                    key={dayKey(i)}
                                    ifevent={!!i.reservations.length}
                                    today={i.dateTime === getDateTimeFromDate(new Date())}
                                    selected={i.dateTime === getDateTimeFromDate(store.date)}
                                    notcurrentmonth={i.disabled}>
                                    {i.dayIndex}
                                </DayViewCell>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
})


export const useDayView = routeLoader$(async ({params, redirect, env, sharedMap}) => {
    const ctx = new Context({env})
    const session = sharedMap.get("session") as Session

    const today = new Date()
    if (params.date === "today") {
        throw redirect(307, getDateTimeFromDate(today))
    }

    // parse date from params (2024-02)
    const parsed = params.date.split("-").map(Number)

    const year = parsed[0] || today.getFullYear()
    const month = (parsed[1] || today.getMonth() + 1) - 1
    const day = (parsed[2] || today.getDate())

    const date = new Date(year, month, day, 1)

    const res = await getLecturerReservations(ctx, session.user.uuid, date)

    return {
        monthDays: await getMonthView(ctx, session.user.uuid, date),
        dayReservations: (res instanceof ApiError) ? [] : res,
        date: date
    }
})

export const useGetMonthView = routeAction$(async (values, {env, sharedMap}) => {
    const ctx = new Context({env})
    const session = sharedMap.get("session") as Session

    let date = new Date(values.date.toString())
    date = new Date(date.setHours(date.getHours() + 1))

    const res = await getLecturerReservations(ctx, session.user.uuid, date)

    return {
        success: true,
        monthDays: await getMonthView(ctx, session.user.uuid, date),
        dayReservations: (res instanceof ApiError) ? [] : res,
        date: date
    }
})