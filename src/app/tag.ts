import {z} from "zod";
import type {MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import * as crypto from "crypto";
import {ApiError} from "~/app/apiError";
import type {TagType} from "~/app/zod";
import {tagZod, zodErrorToString} from "~/app/zod";
import type { Context } from "./context";
import { searchLecturer, updateBulkLecturers } from "~/app/lecturer";

function getIndex(meili: MeiliSearch){
    return meili.index<TagType>('tags')
}

export async function createTag({meili}: Context, data: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
    try {
        const index = getIndex(meili)
        const tag = {
            ...tagZod.omit({uuid: true, alias: true}).parse(data),
            uuid: crypto.randomUUID(),
            alias: crypto.randomBytes(2).toString("hex")
        }
        await meili.tasks.waitForTask((await index.addDocuments([tag])).taskUid)

        return tag

    } catch (e) {
        if (e instanceof z.ZodError) {
            return new ApiError(400, `parse error: ${zodErrorToString(e)}`)
        }

        console.error("Error while creating tag", data, e)

        return ApiError.internal()
    }
}

export async function getTag({meili}: Context, uuid: string): Promise<TagType | ApiError> {
    try {
        return await getIndex(meili).getDocument(uuid)
    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }

        console.error("Error while getting tag", uuid, e)

        return ApiError.internal()
    }
}

export async function listTags({meili}: Context): Promise<TagType[] | ApiError> {
    try {
        const response = await getIndex(meili).search("", {
            limit: 1000,
            sort: ["name:desc"]
        });

        return response.hits.map((i) => ({name: i.name, uuid: i.uuid, alias: i.alias}))

    } catch (e) {
        console.error("Error while listing tag", e)

        return ApiError.internal()
    }
}

export async function searchTag({meili}: Context, query: string, options?: SearchParams): Promise<SearchResponse<TagType> | ApiError> {
    try {
        return await getIndex(meili).search(query, options)

    } catch (e) {
        console.error("Error while searching tag", options, e)

        return ApiError.internal()
    }
}

export async function updateTag(ctx: Context, uuid: string, rawData: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
    try {
        const previousTag = await getTag(ctx, uuid)

        if (previousTag instanceof ApiError) return previousTag

        const data = tagZod.omit({uuid: true, alias: true}).parse(rawData)

        const tag = {
            uuid,
            ...data,
            alias: previousTag.alias
        };

        await Promise.allSettled([
            (async () => {
                await ctx.meili.tasks.waitForTask((await getIndex(ctx.meili).updateDocuments([tag])).taskUid)
            })(),
            onUpdate(ctx, tag)
        ])

        return tag
    } catch (e) {
        console.error("Error while updating tag", uuid, rawData, e)

        return ApiError.internal()
    }
}

export async function deleteTag(ctx: Context, uuid: string): Promise<ApiError | {
    success: true
}> {
    try {
        const getResponse = await getTag(ctx, uuid)
        if (getResponse instanceof ApiError) return getResponse

        await ctx.meili.tasks.waitForTask((await getIndex(ctx.meili).deleteDocument(uuid)).taskUid)

        const lecturers = await searchLecturer(ctx, "", {
            filter: [`tags.uuid = ${uuid}`],
            limit: 1000
        })

        if (lecturers instanceof ApiError) {
            console.error("Error while deleting tag in lecturers", uuid)
            return {success: true}
        }

        const newLecturers = lecturers.hits.map(lecturer => ({
            ...lecturer,
            tags: lecturer.tags?.filter(i => (i.uuid !== uuid))
        }))

        await updateBulkLecturers(ctx, newLecturers)

        return {success: true}
    } catch (e) {
        console.error("Error while deleting tag", uuid, e)

        return ApiError.internal()
    }
}

export async function assureTagExistence(ctx: Context, tag: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
    const searchResults = await searchTag(ctx, "", {filter: [`name = "${tag.name}"`]})

    if (!(searchResults instanceof ApiError) && searchResults.hits.length > 0) return searchResults.hits[0]

    return await createTag(ctx, tag)
}

async function onUpdate(ctx: Context, tag: TagType) {
    const lecturers = await searchLecturer(ctx, "", {
        filter: [`tags.uuid = ${tag.uuid}`],
        limit: 1000
    })

    if (lecturers instanceof ApiError) return lecturers

    const newLecturers = lecturers.hits.map(lecturer => ({
        ...lecturer,
        tags: lecturer.tags?.map(i => (i.uuid === tag.uuid) ? tag : i)
    }))

    await updateBulkLecturers(ctx, newLecturers)
}
