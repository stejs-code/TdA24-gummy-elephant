import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {Context} from "~/app/context";
import {deleteTag, getTag, updateTag} from "~/app/tag";

export const onGet: RequestHandler = async ({env, json, params}) => {
    try {
        const ctx = new Context({env})

        const response = await getTag(ctx, params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onPut: RequestHandler = async ({env, json, params, request}) => {
    try {
        const ctx = new Context({env})

        const response = await updateTag(ctx, params.id, await request.json())

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onDelete: RequestHandler = async ({env, json, params, send}) => {
    try {
        const ctx = new Context({env})

        const response = await deleteTag(ctx, params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        send(new Response(null, {status: 204}))
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


