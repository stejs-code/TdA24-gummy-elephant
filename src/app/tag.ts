import {z} from "zod";
import type {Index, MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import * as crypto from "crypto";
import {ApiError} from "~/app/apiError";
import type {TagType} from "~/app/zod";
import {tagZod, zodErrorToString} from "~/app/zod";


export class Tag {
    private index: Index<TagType>

    constructor(
        private meilisearch: MeiliSearch
    ) {
        this.index = meilisearch.index<TagType>("tags")
    }

    async create(data: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
        try {

            const tag = {
                ...tagZod.omit({uuid: true, alias: true}).parse(data),
                uuid: crypto.randomUUID(),
                alias: crypto.randomBytes(2).toString("hex")
            }

            await this.meilisearch.tasks.waitForTask((await this.index.addDocuments([tag])).taskUid)

            return tag

        } catch (e) {
            if (e instanceof z.ZodError) {
                return new ApiError(400, `parse error: ${zodErrorToString(e)}`)
            }

            console.error("Error while creating tag", data, e)

            return ApiError.internal()
        }
    }

    async get(uuid: string): Promise<TagType | ApiError> {
        try {
            return await this.index.getDocument(uuid)
        } catch (e) {
            if (e instanceof MeiliSearchApiError) {
                return new ApiError(404, "Not found")
            }

            console.error("Error while getting tag", uuid, e)

            return ApiError.internal()
        }
    }

    async list(): Promise<TagType[] | ApiError> {
        try {
            const response = await this.index.search("", {
                limit: 1000,
                sort: ["name:desc"]
            });

            return response.hits.map((i) => ({name: i.name, uuid: i.uuid, alias: i.alias}))

        } catch (e) {
            console.error("Error while listing tag", e)

            return ApiError.internal()
        }
    }

    async search(query: string, options?: SearchParams): Promise<SearchResponse<TagType> | ApiError> {
        try {
            return await this.index.search(query, options)

        } catch (e) {
            console.error("Error while searching tag", options, e)

            return ApiError.internal()
        }
    }

    async update(uuid: string, rawData: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
        try {
            const previousTag = await this.get(uuid)

            if (previousTag instanceof ApiError) return previousTag

            const data = tagZod.omit({uuid: true, alias: true}).parse(rawData)

            const tag = {
                uuid,
                ...data,
                alias: previousTag.alias
            };

            await Promise.allSettled([
                (async () => {
                    await this.meilisearch.tasks.waitForTask((await this.index.updateDocuments([tag])).taskUid)
                })(),
                this.onUpdate(tag)
            ])

            return tag
        } catch (e) {
            console.error("Error while updating tag", uuid, rawData, e)

            return ApiError.internal()
        }
    }

    async delete(uuid: string): Promise<ApiError | {
        success: true
    }> {
        try {
            const getResponse = await this.get(uuid)
            if (getResponse instanceof ApiError) return getResponse

            await this.meilisearch.tasks.waitForTask((await this.index.deleteDocument(uuid)).taskUid)

            const lecturer = new (await import("~/app/lecturer")).Lecturer(this.meilisearch)

            const lecturers = await lecturer.search("", {
                filter: [`tags.uuid = ${uuid}`],
                limit: 1000
            })

            if (lecturers instanceof ApiError) {
                console.error("Error while deleting tag in lecturers", lecturer)
                return {success: true}
            }

            const newLecturers = lecturers.hits.map(lecturer => ({
                ...lecturer,
                tags: lecturer.tags?.filter(i => (i.uuid !== uuid))
            }))

            await lecturer.updateBulk(newLecturers)

            return {success: true}
        } catch (e) {
            console.error("Error while deleting tag", uuid, e)

            return ApiError.internal()
        }
    }

    async assureTagExistence(tag: Omit<TagType, "uuid" | "alias">): Promise<ApiError | TagType> {
        const searchResults = await this.search("", {filter: [`name = "${tag.name}"`]})

        if (!(searchResults instanceof ApiError) && searchResults.hits.length > 0) return searchResults.hits[0]

        return await this.create(tag)
    }

    private async onUpdate(tag: TagType) {
        const lecturer = new (await import("~/app/lecturer")).Lecturer(this.meilisearch)

        const lecturers = await lecturer.search("", {
            filter: [`tags.uuid = ${tag.uuid}`],
            limit: 1000
        })

        if (lecturers instanceof ApiError) return lecturers

        const newLecturers = lecturers.hits.map(lecturer => ({
            ...lecturer,
            tags: lecturer.tags?.map(i => (i.uuid === tag.uuid) ? tag : i)
        }))

        await lecturer.updateBulk(newLecturers)
    }
}