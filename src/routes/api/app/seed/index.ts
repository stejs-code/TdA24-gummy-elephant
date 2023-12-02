import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {defer} from "~/app/utils";
import {Lecturer} from "~/app/lecturer";
import {faker} from "@faker-js/faker/locale/cs_CZ";

export const onPost: RequestHandler = ({env, json}) => {
    const start = performance.now()

    const meilisearch = getMeilisearch(env)

    const LecturerResource = new Lecturer(meilisearch)

    defer(async () => {

        for (let i = 0; i < 200; i++) {
            await LecturerResource.create({
                claim: null,
                location: null,
                middle_name: null,
                route_url: null,
                picture_url: faker.image.urlLoremFlickr({
                    width: 300,
                    height: 300,
                    category: "person",
                }),
                price_per_hour: null,
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
                title_after: null,
                title_before: null,
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