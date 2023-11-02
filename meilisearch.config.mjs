import {MeiliSearch} from "meilisearch";

const client = new MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: "oXw9jumWVuB3PLXzqlxdOWB69aSRcNlWqusoeBfioVU"
})


try {
    client.createIndex("lecturers", {
        primaryKey: "uuid"
    })
} catch (e) {
    /* EMPTY */
}



client.index("lecturers").updateSettings({
    filterableAttributes: ["id", "name"]
})

console.log("Meilisearch successfully configured!")