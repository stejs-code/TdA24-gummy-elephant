import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {Context} from "~/app/context";
import {createLecturer, listLecturers} from "~/app/lecturer";

export function authRequest(headers: Headers): boolean{
    const auth = headers.get("Authorization")
    if(auth == "Basic VGRBOmQ4RWY2IWRHR19wdg==" || auth == "Basic VGRBOmQ4RWY2IWRHR19wdg"){
        return true;
    }
    return false;
}



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

export const onPost: RequestHandler = async ({json, env, request}) => {
    try {
        if(!authRequest(request.headers)){
            json(401, {error: "Missing authorization headers."})
        } else {
            const req = await request.json()
            const ctx = new Context({env})
            const response = await createLecturer(ctx, req)
            if (response instanceof ApiError) return response.sendResponse(json)
            json(200, response)
        }
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}
