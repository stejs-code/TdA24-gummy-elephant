import {RequestHandler} from "@builder.io/qwik-city";
import {Lecturer} from "~/app/lecturer";
import {getMeilisearch} from "~/app/meilisearch";


export const onGet:RequestHandler = async ({env, json, params}) =>{
    const response = (await new Lecturer(getMeilisearch(env)).get(params.id))
    if (response.success){
        json(200, response)
    }else {
        json(404, {"code": 404, message: "User not found"})
    }
}

export const onDelete:RequestHandler = async ({env, json, params}) =>{
    const response = (await new Lecturer(getMeilisearch(env)).get(params.id))
    if (response.success){
        await new Lecturer(getMeilisearch(env)).delete(params.id)
        json(204, {"code": 204, message: "User deleted"});
    } else {
        json(404, {"code": 404, message: "User not found"})
    }
}

export const onPut:RequestHandler = async ({env, json, params, request}) =>{
    const response = (await new Lecturer(getMeilisearch(env)).get(params.id))
    if (response.success) {
        try{
            json(200, await new Lecturer(getMeilisearch(env)).update({...await request.json(), uuid: params.id}))
        }catch (e) {
            json(400, {code: 400, message: JSON.stringify(e)})
        }
    }
    else{
        json(404, {"code": 404, message: "User not found"})
    }
}
