import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {Context} from "~/app/context";
import {createTag, listTags} from "~/app/tag";
import {authRequest} from "~/routes/api/lecturers";

export const onGet: RequestHandler = async ({env, json}) => {
    try {
        const ctx = new Context({env})

        const response = await listTags(ctx)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onPost: RequestHandler = async ({env, json, request}) => {
    try {
        if (!authRequest(request.headers)) {
            json(401, {error: "Missing authorization headers."})
        }else{
            const ctx = new Context({env})

            const response = await createTag(ctx, await request.json())

            if (response instanceof ApiError) return response.sendResponse(json)

            json(200, response)
        }
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}

