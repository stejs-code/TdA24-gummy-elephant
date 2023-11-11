import {fetch} from "undici";
import {errorZod, lecturerZod} from "../src/app/zod";

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
            expect(parse.data.message.includes("picture_url")).toBe(true)
        }
    });


})