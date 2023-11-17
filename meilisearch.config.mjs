import {MeiliSearch} from "meilisearch";

const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: process.env.MEILISEARCH_MASTER_KEY
})


try {
    client.createIndex("lecturers", {
        primaryKey: "uuid"
    })
} catch (e) {
    /* EMPTY */
}


client.index("lecturers").updateSettings({
    filterableAttributes: ["name"]
})

try {
    client.createIndex("tags", {
        primaryKey: "uuid"
    })
} catch (e) {
    /* EMPTY */
}


client.index("tags").updateSettings({
    filterableAttributes: ["name"]
})

console.log("Meilisearch successfully configured!")