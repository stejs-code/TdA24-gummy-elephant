import type {AbortMessage} from "@builder.io/qwik-city/middleware/request-handler";
import {ApiError} from "~/app/apiError";

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