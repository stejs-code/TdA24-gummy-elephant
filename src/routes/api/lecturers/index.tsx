import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {Context} from "~/app/context";
import {listLecturers} from "~/app/lecturer";

export const onGet: RequestHandler = async ({env, json}) => {
    try {
        const ctx = new Context({env})
        const response = await listLecturers(ctx)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onPost: RequestHandler = async ({json}) => {
    try {
        json(401, {error: 401, message: "Auth required"})
        // const ctx = new Context({env})
        //
        // const response = await createLecturer(ctx, await request.json())
        //
        // if (response instanceof ApiError) return response.sendResponse(json)
        //
        // json(200, response)
        //
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}
