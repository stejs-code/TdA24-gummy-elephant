import type {AbortMessage} from "@builder.io/qwik-city/middleware/request-handler";
import {ApiError} from "~/app/apiError";

export function defer(func: () => any) {
    setTimeout(func, 1)
}

export function handleRequestHandlingError(e:any, json: (statusCode: number, data: any) => AbortMessage) {
    if (e instanceof SyntaxError && e.message === "Unexpected end of JSON input") {
        console.error("invalid json", e)
        return json(400, {
            code: 400,
            message: "invalid json"
        })
    }

    console.error(e)
    return ApiError.internal().sendResponse(json)
}