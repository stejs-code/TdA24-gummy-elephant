import MeiliSearch, { MeiliSearchApiError, SearchParams, SearchResponse } from "meilisearch";
import { ApiError } from "./apiError";
import { Context } from "./context"
import type { NotificationType } from "./zod";


function getIndex(meili: MeiliSearch){
    return meili.index<NotificationType>('notifications');
}

export async function searchNotification({meili}: Context, query: string, options?: SearchParams): Promise<SearchResponse<NotificationType> | ApiError> {
    try {
        const index = getIndex(meili);
        const result = await index.search(query, options);
        return result;

    } catch (e) {
        console.error("Error while searching lecturer", options, e)

        return ApiError.internal()
    }
}


export async function getNotification({meili}: Context, id: string): Promise<NotificationType | ApiError>{
    try{
        const index = getIndex(meili);
        return (await index.getDocument(id));
    }
    catch(e){
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }
        console.error("Error while getting lecturer", id, e)
        return ApiError.internal()
    }
}

export async function makeReadNotification(context: Context, id: string): Promise<ApiError | true> {
   try{
        const index = getIndex(context.meili);
        const notification = getNotification(context, id)
        await index.updateDocuments([{...notification, read: true}])
        return true;
    }
    catch(e){
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }
        console.error("Error while getting lecturer", id, e)
        return ApiError.internal()
    }
}
