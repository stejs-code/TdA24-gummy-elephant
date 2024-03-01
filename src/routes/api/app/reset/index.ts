import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {defer} from "~/app/utils";
import {authRequest} from "~/routes/api/lecturers";

export const onPost: RequestHandler = ({env, json, request}) => {
    const meilisearch = getMeilisearch(env)
    if (!authRequest(request.headers)) {
        json(401, {error: "Missing authorization headers."})
    }else{
        defer(() => meilisearch.index("lecturers").deleteAllDocuments())
        defer(() => meilisearch.index("tags").deleteAllDocuments())
        defer(() => meilisearch.index("reservations").deleteAllDocuments())
        defer(() => meilisearch.index("notifications").deleteAllDocuments())
        json(202, {acknowledged: true})
    }
}