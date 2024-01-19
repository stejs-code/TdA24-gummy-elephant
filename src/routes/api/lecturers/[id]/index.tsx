import type {RequestHandler} from "@builder.io/qwik-city";
import {Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";


export const onPut: RequestHandler = async ({env, json, params, request}) => {
    try {
        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.update(params.id, await request.json())

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onGet: RequestHandler = async ({env, json, params}) => {
    try {
        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.get(params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

export const onDelete: RequestHandler = async ({env, json, params, send}) => {
    try {
        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.delete(params.id)

        if (response instanceof ApiError) return response.sendResponse(json)

        send(new Response(null, {status: 204}))
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

