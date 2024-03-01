
import {fetch} from "undici";
import {errorZod, LecturerType, lecturerZod} from "../src/app/zod";
import * as crypto from "crypto";

const url = "http://localhost:5173"
describe("lecturer", () => {
    const validRequestBody = {
        "name": "Rezervace",
        "note": "noteeee",
        "meetingType": "online",
        "dateAt": new Date(),
        "dateUnix": 0,
        "hour": "10",
        "tags": [],
        "student": {
            "first_name": "Lukas",
            "last_name": "Dolezel",
            "email": "gmail@jaroska.cz",
            "telephone": "777 777 777"
        } 
    };

    it("should create", async () => {
        const response = await fetch(url + "/api/reservations/", {
            method: "POST",
            body: JSON.stringify(validRequestBody)
        })

        expect(response.status).toBe(200)

        const body = await response.json() as LecturerType

        console.log(body)

        // cleanup
        await fetch(url + "/api/lecturers/" + body.uuid, {
            method: "DELETE",
        })
    })

    it('should get', async () => {
        const create = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
            })
        })

        const document = await create.json() as LecturerType

        const get = await fetch(`${url}/api/lecturers/${document.uuid}`, {
            method: "GET",
        })

        const parseGet = lecturerZod.safeParse(await get.json())
        expect(parseGet.success).toBe(true)

        // cleanup
        await fetch(url + "/api/lecturers/" + document.uuid, {
            method: "DELETE",
        })
    });

    it('create should fail (missing first_name))', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                last_name: validRequestBody.last_name
            })
        })

        console.log(await response.json())
        expect(response.status).toBeGreaterThanOrEqual(400)
    });

    it('create should fail (first_name as number)', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: 144,
                last_name: validRequestBody.last_name
            })
        })

        console.log(await response.json())
        expect(response.status).toBeGreaterThanOrEqual(400)
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

        console.log(await response.json())
        expect(response.status).toBeGreaterThanOrEqual(400)
    });

    it('create should remove dangerous html', async () => {
        const response = await fetch(url + "/api/lecturers", {
            method: "POST",
            body: JSON.stringify({
                first_name: validRequestBody.first_name,
                last_name: validRequestBody.last_name,
                bio: "<script>alert('bonjour')</script><b>Hi in bold</b>"
            })
        })

        const body = await response.json() as LecturerType

        expect(body.bio).not.toContain("script")
        expect(body.bio).toContain("<b>")

        // cleanup
        await fetch(url + "/api/lecturers/" + body.uuid, {
            method: "DELETE",
        })
    });

    // tag creation
    it('should create', async () => {
        const tag = {
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

        const document = await create.json() as LecturerType

        const get = await fetch(`${url}/api/lecturers/${document.uuid}`, {
            method: "GET",
        })

        const body = await get.json() as LecturerType

        expect(body.tags).not.toBeUndefined()
        if (body.tags && document.tags) {
            expect(body.tags[0].uuid).not.toBeUndefined()
            expect(body.tags[0].uuid).toBe(document.tags[0].uuid)
        }

        // cleanup
        await fetch(url + "/api/lecturers/" + body.uuid, {
            method: "DELETE",
        })
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
