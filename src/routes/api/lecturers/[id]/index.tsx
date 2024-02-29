import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {deleteLecturer, getLecturer, updateLecturer} from "~/app/lecturer";
import {Context} from "~/app/context";
import {authRequest} from "..";


export const onPut: RequestHandler = async ({env, json, params, request}) => {
    try {
        if (!authRequest(request.headers)) {
            json(401, {error: "Missing authorization headers."})
        } else {
            const ctx = new Context({env})

            const response = await updateLecturer(ctx, params.id, await request.json())

            if (response instanceof ApiError) return response.sendResponse(json)

            json(200, response)
        }
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onGet: RequestHandler = async ({env, json, params}) => {
    try {
        const ctx = new Context({env})

        const response = await getLecturer(ctx, params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onDelete: RequestHandler = async ({env, json, params, send, request}) => {
    try {
        if (!authRequest(request.headers)) {
            json(401, {error: "Missing authorization headers."})
        } else {
            const ctx = new Context({env})
            const response = await deleteLecturer(ctx, params.id)
            if (response instanceof ApiError) return response.sendResponse(json)
            send(new Response(null, {status: 204}))
        }
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

