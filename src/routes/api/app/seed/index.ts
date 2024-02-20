import type {RequestHandler} from "@builder.io/qwik-city";
import {defer} from "~/app/utils";
import {faker} from "@faker-js/faker/locale/cs_CZ";
import {createLecturer} from "~/app/lecturer";
import {Context} from "~/app/context";

export const onPost: RequestHandler = ({env, json}) => {
    const start = performance.now()

    const ctx = new Context({env})
    defer(async () => {

        for (let i = 0; i < 200; i++) {
            await createLecturer(ctx, {
                claim: faker.lorem.sentences(1),
                location: faker.helpers.arrayElement([
                    "Brno",
                    "Praha",
                    "Ostrava",
                    "Olomouc"
                ]),
                picture_url: faker.image.urlLoremFlickr({
                    width: 300,
                    height: 300,
                    category: "person",
                }),
                price_per_hour: faker.number.int({
                    min: 1,
                    max: 14,
                }) * 100,
                tags: faker.helpers.arrayElements([
                    "Miluje kakao",
                    "Alchymista",
                    "Erudovaný pekař",
                    "Milující maminka",
                    "Daňový poplatník",
                    "Psychicky labilní",
                    "Probruselský agent",
                    "Hledaný kriminálník",
                    "Milovník mašinek 🚂"
                ], faker.number.int(9)).map(i => ({name: i})),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                bio: faker.lorem.sentences(4),
                contact: {
                    emails: [
                        faker.internet.email()
                    ],
                    telephone_numbers: [
                        faker.phone.number()
                    ]
                }
            })
        }

        const end = performance.now() - start

        console.info(`Finished seeding database in ${Math.round(end)} ms`)
    })

    json(202, {acknowledged: true})
}