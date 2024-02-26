import type {AbortMessage} from "@builder.io/qwik-city/middleware/request-handler";
import {ApiError} from "~/app/apiError";
import {twMerge} from "tailwind-merge"
import {type ClassValue, clsx} from "clsx"

export function defer(func: () => any) {
    setTimeout(func, 1)
}

export function handleRequestHandlingError(e: any, json: (statusCode: number, data: any) => AbortMessage) {
    if (e instanceof SyntaxError && e.message === "Unexpected end of JSON input") {
        console.error("Invalid json", e)
        return json(400, {
            code: 400,
            message: "Invalid json"
        })
    }

    console.error(e)
    return ApiError.internal().sendResponse(json)
}


export function forI<T>(i: number, func: (i: number) => T): T[] {
    const returnVal: T[] = []

    for (let j = 0; j < i; j++) {
        returnVal.push(func(j + 1))
    }

    return returnVal
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function addOneDay(date = new Date()) {
    date.setDate(date.getDate() + 1);

    return date;
}

const formatter = new Intl.RelativeTimeFormat("cs", {
    numeric: "auto",
})

const DIVISIONS = [
    {amount: 60, name: "seconds"},
    {amount: 60, name: "minutes"},
    {amount: 24, name: "hours"},
    {amount: 7, name: "days"},
    {amount: 4.34524, name: "weeks"},
    {amount: 12, name: "months"},
    {amount: Number.POSITIVE_INFINITY, name: "years"},
]

export function formatTimeAgo(date: Date) {
    let duration = (date.getTime() - new Date().getTime()) / 1000

    for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i]
        if (Math.abs(duration) < division.amount) {
            return formatter.format(Math.round(duration), division.name as any)
        }
        duration /= division.amount
    }
}