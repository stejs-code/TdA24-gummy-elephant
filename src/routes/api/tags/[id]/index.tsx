import type {RequestHandler} from "@builder.io/qwik-city";
import {Tag} from "~/app/tag";
import {getMeilisearch} from "~/app/meilisearch";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";

export const onGet: RequestHandler = async ({env, json, params}) => {
    try {
        const TagResource = new Tag(getMeilisearch(env))

        const response = await TagResource.get(params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onPut: RequestHandler = async ({env, json, params, request}) => {
    try {
        const TagResource = new Tag(getMeilisearch(env))

        const response = await TagResource.update(params.id, await request.json())

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onDelete: RequestHandler = async ({env, json, params, send}) => {
    try {
        const TagResource = new Tag(getMeilisearch(env))

        const response = await TagResource.delete(params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        send(new Response(null, {status: 204}))
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


