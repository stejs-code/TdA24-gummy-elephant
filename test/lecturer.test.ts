import {fetch} from "undici";
import {errorZod, lecturerZod} from "../src/app/zod";
import * as crypto from "crypto";

const url = "http://localhost:5173"
describe("lecturer", () => {
    const validRequestBody = {
        "title_before": "Mgr.",
        "first_name": "Petra",
        "middle_name": "Swil",
        "last_name": "Plachá",
        "title_after": "MBA",
        "picture_url": "https://picsum.photos/200",
        "location": "Brno",
        "claim": "Bez dobré prezentace je i nejlepší myšlenka k ničemu.",
        "bio": "<b>Formátovaný text</b> s <i>bezpečnými</i> tagy.",
        "tags": [
            {
                "name": "Marketing"
            }
        ],
        "price_per_hour": 720,
        "contact": {
            "telephone_numbers": [
                "+123 777 338 111"
            ],
            "emails": [
                "user@example.com"
            ]
        }
    };

    it("should create", async () => {

        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify(validRequestBody)
        })

        const parse = lecturerZod.safeParse(await response.json())
        expect(parse.success).toBe(true)
    })

    it('should get', async () => {
        const create = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
            })
        })

        const parseCreate = lecturerZod.safeParse(await create.json())
        expect(parseCreate.success).toBe(true)
        if (!parseCreate.success) throw new Error("should be true")

        const get = await fetch(`${url}/api/lecturers/${parseCreate.data.uuid}`, {
            method: "GET",
        })

        const parseGet = lecturerZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)
    });

    it('should create with minimum required fields', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name
            })
        })

        const parse = lecturerZod.safeParse(await response.json())
        expect(parse.success).toBe(true)
    });

    it('create should fail (missing first_name))', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                last_name: validRequestBody.last_name
            })
        })

        const parse = errorZod.safeParse(await response.json())
        expect(parse.success).toBe(true)
    });

    it('create should fail (first_name as number)', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: 144,
                last_name: validRequestBody.last_name
            })
        })

        const parse = errorZod.safeParse(await response.json())
        expect(parse.success).toBe(true)

        if (parse.success) {
            expect(parse.data.message.includes("first_name")).toBe(true)
        }
    });

    it('create should fail (picture_url !== url)', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                picture_url: "hello there"
            })
        })

        const parse = errorZod.safeParse(await response.json())
        expect(parse.success).toBe(true)
        if (parse.success) {
            console.log(parse.data.message)
            expect(parse.data.message.includes("picture_url")).toBe(true)
        }
    });

    it('create should fail (dangerous html)', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                bio: "<script>alert('bonjour')</script>"
            })
        })

        const parse = errorZod.safeParse(await response.json())
        expect(parse.success).toBe(true)

        if (parse.success) {
            expect(parse.data.message.includes("bio")).toBe(true)
        }
    });

    // id is undefined and the tags name was never used before
    it('should create (id undefined)', async () => {
        const create = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [
                    {
                        name: crypto.randomBytes(8).toString("hex"),
                    }
                ]
            })
        })

        const parseCreate = lecturerZod.safeParse(await create.json())
        expect(parseCreate.success).toBe(true)
        if (!parseCreate.success) throw new Error("should be true")

        const get = await fetch(`${url}/api/lecturers/${parseCreate.data.uuid}`, {
            method: "GET",
        })

        const parseGet = lecturerZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)
        if (!parseGet.success) throw new Error("should be true")

        expect(parseGet.data.tags?.[0].uuid).not.toBeUndefined()
    });

    // the provided tag id doesn't exist in the database
    // it should be created with the provided id
    it('should create (tag id is defined, but nonexistent)', async () => {
        const tag = {
            uuid: crypto.randomUUID(),
            name: crypto.randomBytes(8).toString("hex"),
        }

        const create = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [tag]
            })
        })

        const parseCreate = lecturerZod.safeParse(await create.json())
        expect(parseCreate.success).toBe(true)
        if (!parseCreate.success) throw new Error("should be true")

        const get = await fetch(`${url}/api/lecturers/${parseCreate.data.uuid}`, {
            method: "GET",
        })

        const parseGet = lecturerZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)
        if (!parseGet.success) throw new Error("should be true")

        expect(parseGet.data.tags?.[0].uuid).toBe(tag.uuid)
    });

    // provided tag id exists,
    // but his name is different, than the one stored
    // -> rename tag, rename tags in all usages
    it('should create (tag name update)', async () => {
        const tag = {
            uuid: crypto.randomUUID(),
            name: crypto.randomBytes(8).toString("hex"),
        }

        const create1 = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [tag]
            })
        })

        const parseCreate1 = lecturerZod.safeParse(await create1.json())
        expect(parseCreate1.success).toBe(true)
        if (!parseCreate1.success) throw new Error("should be true")


        const create2 = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [{
                    uuid: tag.uuid,
                    name: "changed :)"
                }]
            })
        })

        const parseCreate2 = lecturerZod.safeParse(await create2.json())
        expect(parseCreate2.success).toBe(true)
        if (!parseCreate2.success) throw new Error("should be true")

        const get1 = await fetch(`${url}/api/lecturers/${parseCreate1.data.uuid}`, {
            method: "GET",
        })

        const parseGet1 = lecturerZod.safeParse(await get1.json())
        expect(parseGet1.success).toBe(true)
        if (!parseGet1.success) throw new Error("should be true")
        expect(parseGet1.data.tags?.[0].name).toBe("changed :)")

        const get2 = await fetch(`${url}/api/lecturers/${parseCreate1.data.uuid}`, {
            method: "GET",
        })

        const parseGet2 = lecturerZod.safeParse(await get2.json())
        expect(parseGet2.success).toBe(true)
        if (!parseGet2.success) throw new Error("should be true")
        expect(parseGet2.data.tags?.[0].name).toBe("changed :)")
    });

    // the provided tag name is already used,
    // but tag id isn't provided
    // -> don't create new tag document
    //    use the already existing
    it('should create (tag name is used)', async () => {
        const tag = {
            uuid: crypto.randomUUID(),
            name: crypto.randomBytes(8).toString("hex"),
        }

        const create1 = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [tag]
            })
        })

        const parseCreate1 = lecturerZod.safeParse(await create1.json())
        expect(parseCreate1.success).toBe(true)
        if (!parseCreate1.success) throw new Error("should be true")


        const create2 = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                tags: [{
                    uuid: crypto.randomUUID(),
                    name: tag.name
                }]
            })
        })

        const parseCreate2 = lecturerZod.safeParse(await create2.json())
        expect(parseCreate2.success).toBe(true)
        if (!parseCreate2.success) throw new Error("should be true")

        const get = await fetch(`${url}/api/lecturers/${parseCreate2.data.uuid}`, {
            method: "GET",
        })

        const parseGet = lecturerZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)
        if (!parseGet.success) throw new Error("should be true")

        expect(parseGet.data.tags?.[0].uuid).toBe(tag.uuid)
    });

    it('should list', async () => {
        const list = await fetch(url + "/api/lecturers", {
            method: "GET",
        })

        const listResult = lecturerZod.array().safeParse(await list.json())

        expect(listResult.success).toBe(true)
    });

    it('should delete', async () => {
        const lecturer = await (await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
            })
        })).json() as any


        await fetch(url + "/api/lecturers/" + lecturer.uuid, {
            method: "DELETE",
        })

        const get = await fetch(`${url}/api/lecturers/${lecturer.uuid}`, {
            method: "GET",
        })

        const parseGet = errorZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)

    });

    it("shouldn't delete", async () => {
        const deleteResponse = await fetch(url + "/api/lecturers/" + crypto.randomUUID(), {
            method: "DELETE",
        })
        const deleteResult = errorZod.safeParse(await deleteResponse.json())
        expect(deleteResult.success).toBe(true)
    });
})