import type MeiliSearch from "meilisearch";
import type {SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import {ApiError} from "./apiError";
import type {Context} from "./context"
import {type NotificationType, notificationZod} from "./zod";


function getIndex(meili: MeiliSearch) {
    return meili.index<NotificationType>('notifications');
}

export async function searchNotification({meili}: Context, query: string, options?: SearchParams): Promise<SearchResponse<NotificationType> | ApiError> {
    try {
        const index = getIndex(meili);
        return await index.search(query, options);

    } catch (e) {
        console.error("Error while searching lecturer", options, e)

        return ApiError.internal()
    }
}


export async function getNotification({meili}: Context, id: string): Promise<NotificationType | ApiError> {
    try {
        const index = getIndex(meili);
        return (await index.getDocument(id));
    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }
        console.error("Error while getting notification", id, e)
        return ApiError.internal()
    }
}

export async function makeNotificationRead(ctx: Context, id: string): Promise<ApiError | true> {
    try {
        await getIndex(ctx.meili).updateDocuments([{uuid: id, read: true}])

        return true;
    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }
        console.error("Error while editing notification", id, e)
        return ApiError.internal()
    }
}


export async function createNotification({meili}: Context, notification: Omit<NotificationType, "uuid">): Promise<ApiError | NotificationType> {
    try {
        const index = getIndex(meili);
        const not = notificationZod.parse({...notification, uuid: crypto.randomUUID()})
        await index.addDocuments([not])
        return not
    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }
        console.error("Error while creating notification", e)
        return ApiError.internal()
    }
}
