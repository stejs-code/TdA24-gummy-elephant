import {RequestHandler} from "@builder.io/qwik-city";
import {Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";

export const onGet:RequestHandler = async ({env, json}) =>{
    const response = (await new Lecturer(getMeilisearch(env)).list())
    json(200, response.data)
}