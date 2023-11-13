import type {RequestHandler} from "@builder.io/qwik-city";
import {createParam, Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";
import {z} from "zod";

export const onGet:RequestHandler = async ({env, json}) =>{
    json(200, (await new Lecturer(getMeilisearch(env)).list()).data)
}
export const onPost:RequestHandler = async ({env, json, request}) =>{
    try{

        const response = (await request.json())
        const lecturer = new Lecturer(getMeilisearch(env))
        if('picture_url' in response) {
            if (!(z.string().url(response.picture_url))) {
                json(400, {code: 400, message: "picture_url is not a valid URL"})
                return
            }
        }
        json(200, (await lecturer.create(createParam.parse(response))).data)


    }catch (e) {
        json(400, {code: 400, message: JSON.stringify(e)})
    }
}