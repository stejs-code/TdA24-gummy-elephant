import type {RequestHandler} from "@builder.io/qwik-city";
import {Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";


export const onPost:RequestHandler = async ({env, json, request}) =>{
    json(200, (await new Lecturer(getMeilisearch(env)).create(await request.json())).data)
}