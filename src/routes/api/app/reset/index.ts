import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {defer} from "~/app/utils";

export const onPost: RequestHandler = ({env, json}) => {
    const meilisearch = getMeilisearch(env)

    defer(() => meilisearch.index("lecturers").deleteAllDocuments())
    defer(() => meilisearch.index("tags").deleteAllDocuments())

    json(202, {acknowledged: true})
}