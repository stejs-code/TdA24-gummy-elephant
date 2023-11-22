import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {Tag} from "~/app/tag";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";

export const onGet: RequestHandler = async ({env, json}) => {
    try {
        const TagResource = new Tag(getMeilisearch(env))

        const response = await TagResource.list()

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onPost: RequestHandler = async ({env, json, request}) => {
    try {
        const TagResource = new Tag(getMeilisearch(env))

        const response = await TagResource.create(await request.json())

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

