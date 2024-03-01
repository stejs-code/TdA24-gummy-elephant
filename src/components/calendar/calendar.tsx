import {createContextId} from "@builder.io/qwik";
import type {Context} from "~/app/context";
import {getReservationIndex, getUnix} from "~/app/reservation";
import type {ReservationType} from "~/app/zod";
import {capitalizeFirstLetter} from "~/app/utils";

export type Day = {
    disabled: boolean,
    dayIndex: number, // 1 - 31
    monthRelIndex: number, // 0, 1, 2
    index: number, // 0 - 41
    dateTime: string, // 2023-11-4
    date: Date,
    reservations: ReservationType[]
}

export const CalendarContext = createContextId<{
    days: Day[],
    date: Date,
}>(
    'site.calendar-context'
);

/**
 * Return number of days in specified month
 * @param year Year
 * @param month Month 0 - 11
 */
export function numberOfDays(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

/**
 * Return index of the day in week
 * @param year Year
 * @param month Month 0 - 11
 * @param day
 */
export function dayIndexInWeek(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay()
}

/**
 * Return dateTime string e.g. 2023-11-5
 * @param year Year
 * @param month Month 0 - 11
 * @param day
 */
export function getDateTime(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}


/**
 * Return dateTime string e.g. 2023-11-5
 * @param date
 */
export function getDateTimeFromDate(date: Date) {
    return getDateTime(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Return array of days to render in calendar month-view
 * @param ctx
 * @param lecturerId
 * @param date
 */
export async function getMonthView(ctx: Context, lecturerId: string, date: Date) {
    const numberOfDaysInView = 42
    const month = date.getMonth()

    const year = date.getFullYear()

    const firstDay = new Date(year, month, 1)
    const daysBeforeFirst = dayIndexInWeek(year, month, 1) ? dayIndexInWeek(year, month, 1) - 1 : 6
    const numOfDays = numberOfDays(year, month)
    const daysAfterLast = numberOfDaysInView - daysBeforeFirst - numOfDays
    const days: Day[] = []


    const prevMonthYear = month === 0 ? year - 1 : year
    const prevMonthIndex = month === 0 ? 11 : month - 1
    const prevMonthDays = numberOfDays(prevMonthYear, prevMonthIndex)

    for (let i = 0; i < daysBeforeFirst; i++) {
        days.unshift({
            disabled: true,
            dayIndex: prevMonthDays - i,
            dateTime: getDateTime(prevMonthYear, prevMonthIndex, prevMonthDays - i),
            monthRelIndex: 0,
            index: daysBeforeFirst - i,
            date: new Date(prevMonthYear, prevMonthIndex, prevMonthDays - i),
            reservations: []
        })
    }


    for (let i = 0; i < numOfDays; i++) {
        days.push({
            disabled: false,
            dayIndex: i + 1,
            dateTime: getDateTime(year, month, i + 1),
            monthRelIndex: 1,
            index: i + daysBeforeFirst,
            date: new Date(year, month, i + 1),
            reservations: []
        })
    }

    const nextMonthYear = month === 11 ? year + 1 : year
    const nextMonthIndex = month === 11 ? 0 : month + 1

    for (let i = 0; i < daysAfterLast; i++) {
        days.push({
            disabled: true,
            dayIndex: i + 1,
            dateTime: getDateTime(nextMonthYear, nextMonthIndex, i + 1),
            monthRelIndex: 2,
            index: i + daysBeforeFirst + numOfDays,
            date: new Date(nextMonthYear, nextMonthIndex, i + 1),
            reservations: []
        })
    }

    const daysMap = new Map(days.map(i => [i.dateTime, i]))

    const response = await getReservationIndex(ctx.meili).search("", {
        filter: [
            `lecturer = ${lecturerId}`,
            `dateUnix >= ${getUnix(firstDay) - 60 * 60 * 24 * daysBeforeFirst}`,
            `dateUnix <= ${getUnix(firstDay) + 60 * 60 * 24 * (daysAfterLast + numOfDays)}`
        ]
    })
    response.hits.forEach((i) => {
        const time = getDateTimeFromDate(new Date(i.dateAt))
        const day = daysMap.get(time)
        if (day) {
            day.reservations.push(i)
        }
    })

    return Array
        .from(daysMap)
        .map(([, i]) => i)
        .sort((a, b) => a.index - b.index)

}

export type ShortDay = { short: string, dayN: number, today: boolean, selected: boolean, dateTime: string }

export function getSurroundingDaysView(date: Date): ShortDay[] {
    const array: ShortDay[] = []
    const d = new Date(date)

    d.setDate(d.getDate() - 4)

    for (let i = 0; i < 7; i++) {
        const day = new Date(d.setDate(d.getDate() + 1))

        array.push({
            short: capitalizeFirstLetter(new Intl.DateTimeFormat('cs', {
                weekday: "short"
            }).format(day)),
            dayN: day.getDate(),
            selected: i === 3,
            today: new Date().setHours(0, 0, 0, 0) === day.setHours(0, 0, 0, 0),
            dateTime: getDateTimeFromDate(day)
        })
    }


    return array

}


export function dayKey(day: Day) {
    return `${day.dateTime}-${day.index}-${day.reservations.map(i => i.uuid + i.student.first_name + i.student.last_name + `${i.hourStart}-${i.hourEnd}`).join(".")}}`
}