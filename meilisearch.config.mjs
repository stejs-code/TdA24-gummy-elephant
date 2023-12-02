import {MeiliSearch} from "meilisearch";

const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: process.env.MEILISEARCH_MASTER_KEY
});

(async () => {
    try {
        await client.createIndex("lecturers", {
            primaryKey: "uuid"
        })
    } catch (e) {
        /* EMPTY */
    }


    await client.index("lecturers").updateSettings({
        filterableAttributes: ["tags.uuid", "tags.alias", "route_url"],
        sortableAttributes: ["first_name", "last_name", "uuid"]
    })

    try {
        await client.createIndex("tags", {
            primaryKey: "uuid"
        })
    } catch (e) {
        /* EMPTY */
    }


    await client.index("tags").updateSettings({
        filterableAttributes: ["name"],
        sortableAttributes: ["name"]
    })
})()

