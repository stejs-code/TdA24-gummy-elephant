import {fetch} from "undici";
import * as crypto from "crypto";
import {tagZod} from "../src/app/zod";


const url = "http://localhost:5173"

describe("tags", () => {

    it('should crud', async () => {
        const tag = {
            name: crypto.randomBytes(8).toString("hex")
        }

        const create = await fetch(url + "/api/tags", {
            method: "POST",
            body: JSON.stringify({
                name: tag.name
            })
        })

        const parseCreate = tagZod.strict().safeParse(await create.json())
        expect(parseCreate.success).toBe(true)
        if (!parseCreate.success) throw new Error("should be true")

        const get = await fetch(`${url}/api/tags/${parseCreate.data.uuid}`, {
            method: "GET",
        })

        const parseGet = tagZod.safeParse(await get.json())
        if (!parseGet.success) console.log(parseGet.error)
        expect(parseGet.success).toBe(true)


        const deleteResponse = await fetch(`${url}/api/tags/${parseCreate.data.uuid}`, {
            method: "DELETE",
        })


        expect(deleteResponse.status).toBe(204)
    });


    it('should create fail', async () => {

        const create = await fetch(url + "/api/tags", {
            method: "POST",
            body: JSON.stringify(1)
        })

        expect(create.status).toEqual(400)
        console.log(await create.json())
    });

    it('should get fail',async () => {

        const get = await fetch(`${url}/api/tags/wontFind`, {
            method: "GET",
        })

        expect(get.status).toBe(404)
        console.log(await get.json())
    });


    it('should delete fail',async () => {
        const deleteResponse = await fetch(`${url}/api/tags/your_mother`, {
            method: "DELETE",
        })

        expect(deleteResponse.status).toEqual(404)
        console.log(await deleteResponse.json())
    });
})