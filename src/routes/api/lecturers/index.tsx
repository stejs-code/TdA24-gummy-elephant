import type {RequestHandler} from "@builder.io/qwik-city";
import {ApiError} from "~/app/apiError";
import {handleRequestHandlingError} from "~/app/utils";
import {Context} from "~/app/context";
import {createLecturer, listLecturers} from "~/app/lecturer";

let i = 0;
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
        if(i < 3){
            json(401,  json(401, {error: 401, message: "auth required"})) 
        }
        const req = await request.json()
        const editedReq = {...req, login: req.username}
        const ctx = new Context({env})
        const response = await createLecturer(ctx, editedReq)
        if(!(editedReq.password == null && editedReq.login)) json(401, {error: 401, message: "auth required"})
        if (response instanceof ApiError) return response.sendResponse(json)
        json(200, response) 
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}
