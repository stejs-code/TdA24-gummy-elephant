import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {ApiError} from "~/app/apiError";
import {Lecturer} from "~/app/lecturer";
import {handleRequestHandlingError} from "~/app/utils";

export const onGet: RequestHandler = async ({env, json}) => {
    try {
        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.list()

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onPost: RequestHandler = async ({env, json, request}) => {
    try {
        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.create(await request.json())

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)

    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}