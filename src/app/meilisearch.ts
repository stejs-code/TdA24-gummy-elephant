import {MeiliSearch} from "meilisearch";
import {isBrowser} from "@builder.io/qwik/build";
import type {EnvGetter} from "@builder.io/qwik-city/middleware/request-handler";


export function getMeilisearch(env: EnvGetter) {
    if (isBrowser) throw new Error("tried to run meilisearch in browser")

    return new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: env.get("MEILISEARCH_MASTER_KEY")
    })
}