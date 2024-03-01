import {component$, useContextProvider, useSignal, useStore, useTask$} from "@builder.io/qwik";
import {CalendarContext, getDateTimeFromDate, getMonthView} from "~/components/calendar/calendar";
import {capitalizeFirstLetter, cn} from "~/app/utils";
import {Link, routeAction$, routeLoader$, useNavigate} from "@builder.io/qwik-city";
import {Context} from "~/app/context";
import type {Session} from "~/app/session";
import type {ReservationType} from "~/app/zod";
import {PrimaryButton} from "~/components/ui/button";
import {Change, ChangeMobile} from "~/components/reservations/change";
import { Popup } from "~/components/reservations/popup";

export default component$(() => {
    const data = useMonthView()
    const action = useGetMonthView()

    const popupState = useSignal(false)

    const store = useStore({
        days: data.value.days,
        date: data.value.date
    }, {deep: true})


    useContextProvider(CalendarContext, store);

    useTask$(({track}) => {
        track(() => action.value)

        if (action.value?.success) {
            store.days = action.value.days
            store.date = action.value.date
            window.history.replaceState({}, "", `/hub/reservations/month-view/${getDateTimeFromDate(store.date).slice(0, -3)}`);
        }
    })

    return (
        <div class={"px-4 flex-grow flex flex-col"}>
            {/*<Popup first_name={""} last_name={""} email={""} phone={"+022 022 999 643"} date={3} time={1} comment={"mam rad knedlicky se zelim"} modalVisible={popupState}/>*/}
            <div class="flex flex-grow flex-col mt-2 pb-4">
                <header
                    class="flex flex-none items-center justify-between py-4">
                    <div>
                        <h1 class="text-3xl font-display font-semibold leading-6 text-gray-900">
                            <time dateTime={getDateTimeFromDate(store.date)} class="sm:hidden">
                                {capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
                                    month: "long",
                                    year: "numeric"
                                }).format(store.date))}
                            </time>
                            <time dateTime={getDateTimeFromDate(store.date)} class="hidden sm:inline">
                                {capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
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
                                            date: new Date(store.date.setMonth(store.date.getMonth() - 1))
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
                                            date: new Date(store.date.setMonth(store.date.getMonth() + 1))
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
                            <Change date={store.date} type={"Měsíční"}/>
                            <div class="ml-3 mr-3 h-6 w-px bg-gray-300"></div>
                            <a href={"/exportCal"}>
                                <PrimaryButton>
                                    Exportovat
                                </PrimaryButton>
                            </a>
                        </div>

                        <ChangeMobile date={store.date} type={"Měsíční"}/>
                    </div>
                </header>


                <div class="shadow ring-1 ring-black ring-opacity-5 flex flex-col flex-grow h-full max-h-96 lg:max-h-full">
                    <div
                        class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                        <div class="flex justify-center bg-white py-2">
                            <span>Po</span>
                            <span class="sr-only sm:not-sr-only">ndělí</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Út</span>
                            <span class="sr-only sm:not-sr-only">erý</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>St</span>
                            <span class="sr-only sm:not-sr-only">ředa</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Čt</span>
                            <span class="sr-only sm:not-sr-only">vrtek</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Pát</span>
                            <span class="sr-only sm:not-sr-only">ek</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Sob</span>
                            <span class="sr-only sm:not-sr-only">ota</span>
                        </div>
                        <div class="flex justify-center bg-white py-2">
                            <span>Neď</span>
                            <span class="sr-only sm:not-sr-only">ele</span>
                        </div>
                    </div>
                    <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto flex-grow">
                        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                            {store.days.map((day) => (
                                <LgDayCell
                                    key={day.dateTime + day.index}
                                    dateTime={day.dateTime}
                                    dayN={day.dayIndex}
                                    reservations={day.reservations}
                                    disabled={day.disabled}
                                    today={day.dateTime === getDateTimeFromDate(new Date())}
                                />
                            ))}

                        </div>
                        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                            {store.days.map((day) => (
                                <SmDayCell
                                    key={day.dateTime + day.index}
                                    dateTime={day.dateTime}
                                    reservations={day.reservations}
                                    dayN={day.dayIndex}
                                    disabled={day.disabled}
                                    today={day.dateTime === getDateTimeFromDate(new Date())}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
})


export const LgDayCell = component$<{
    dateTime: string,
    dayN: number,
    disabled?: boolean,
    reservations: ReservationType[],
    today?:boolean,
}>(
    ({dateTime, disabled, dayN, reservations, today}) => {
        const navigate = useNavigate()
        return <div
            onDblClick$={() => {
                return navigate(`/hub/reservations/day-view/${dateTime}`)
            }}
            class={cn("relative bg-white px-3 py-2", disabled && "bg-gray-50 text-gray-500")}>
            <time dateTime={dateTime} class={today && "bg-primary-300 text-white flex h-8 w-8 justify-center items-center rounded-full"}>{dayN}</time>
            <ol class="mt-2">
                {reservations.map(i => (
                    <li key={i.uuid}>
                        <button class="group flex w-full">
                            <p class="truncate font-medium text-gray-900 group-hover:text-primary-300">{i.student.first_name} {i.student.last_name}</p>
                            <time dateTime={`${dateTime}T${i.hourStart}:00`}
                                  class="ml-auto hidden flex-none text-gray-500 group-hover:text-primary-300 xl:block">{i.hourStart}:00-{i.hourEnd}:00
                            </time>
                        </button>
                    </li>
                ))}
            </ol>
        </div>

    }
)

export const SmDayCell = component$<{
    dateTime: string,
    dayN: number,
    disabled?: boolean,
    reservations: ReservationType[],
    today?:boolean,
}>(
    ({dateTime, disabled, dayN, reservations, today}) => {
        return <Link
            href={`/hub/reservations/day-view/${dateTime}`}
            class={cn("flex flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10", disabled && "bg-gray-50 text-gray-500")}>
            <time dateTime={dateTime} class={today && "bg-primary-300 text-white flex h-6 w-6 justify-center items-center rounded-full"}>{dayN}</time>
            <span class="sr-only">0 events</span>
            <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                {reservations.map(i => (
                    <span key={i.uuid} class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                ))}
          </span>
        </Link>
    }
)

export const useMonthView = routeLoader$(async ({params, redirect, env, sharedMap}) => {
    const ctx = new Context({env})
    const session = sharedMap.get("session") as Session

    const today = new Date()
    if (params.date === "today") {
        throw redirect(307, `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`)
    }

    // parse date from params (2024-02)
    const parsed = params.date.split("-").map(Number)

    const year = parsed[0] || today.getFullYear()
    const month = (parsed[1] || today.getMonth() + 1) - 1

    const date = new Date(year, month)

    return {
        days: await getMonthView(ctx, session.user.uuid, date),
        date: date
    }
})

export const useGetMonthView = routeAction$(async (values, {env, sharedMap}) => {
    const ctx = new Context({env})
    const session = sharedMap.get("session") as Session
    const date = new Date(values.date.toString())

    return {
        success: true,
        days: await getMonthView(ctx, session.user.uuid, date),
        date: date
    }
})