import {z} from "zod";
import type {Index, MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import * as crypto from "crypto";
import {ApiError} from "~/app/apiError";
import {MeiliSearchApiError} from "meilisearch";



export const tagZod = z.object({
    uuid: z.string(),
    name: z.string()
})

export type TagType = z.infer<typeof tagZod>

export type ResponseType<T> = Promise<{success: true, data: T}| {success: false}>

export class Tag{
    index: Index<TagType>

    constructor(
        private meilisearch: MeiliSearch
    ){
        this.index = meilisearch.index<TagType>("tags")
    }

    async create(data: Omit<TagType, "uuid">): Promise<ApiError | TagType> {
        try {
            const uuid = crypto.randomUUID()

            const document = tagZod.safeParse({
                name: data.name,
                uuid: uuid
            })

            if (document.success) {
                await this.meilisearch.tasks.waitForTask((await this.index.addDocuments([])).taskUid)

                return document.data
            }

            return new ApiError(400, `parse error: ${document.error.toString()}`)

        } catch (e) {
            console.error(e)

            return new ApiError(500, "internal server error happened")
        }
    }

    async get(id: string): Promise<TagType | ApiError>{
        try {
            const result = tagZod.safeParse(await this.index.getDocument(id))

            if (result.success) {
                return result.data
            }

            return new ApiError(500, "tag has invalid value")
        }catch (e) {
            if (e instanceof MeiliSearchApiError) {
                return new ApiError(404, "not found")
            }

            console.error(e)

            return new ApiError(500, "internal server error happened")
        }
    }

    async list(): Promise<TagType[] | ApiError> {
        try {
            const response = await this.index.search("", {limit: 1000, sort: ["last_name:desc", "first_name:desc", "uuid:desc"]});
            const result = response.hits.map((i) => {
                const result = tagZod.safeParse(i)
                if (result.success) return result.data
            })


            if (result.includes(undefined)) console.error("one of the tags has invalid value")

            return result.filter(i => i) as TagType[]

        } catch (e) {
            console.error(e)

            return new ApiError(500, "internal error")
        }
    }

    async search(query: string, options?: SearchParams): Promise<SearchResponse<TagType> | ApiError>{
        try {
            return await this.index.search(query, options)

        } catch (e) {
            console.error(e)

            return new ApiError(500, "internal error")
        }
    }

    async createMissingTags(tags: string[]) {
    //     const foundTagsNames: string[] = []
    //     const enhancedTags: TagType[] = []
    //
    //     const response = await this.search("", {
    //         filter: [tags.map(i => `name = "${i}"`)],
    //         limit: 200
    //     })
    //
    //     if (response.data){
    //         foundTagsNames.push(...response.data.hits.map(i => i.name))
    //     }
    //
    //     for (const tag of tags) {
    //         if (!foundTagsNames.includes(tag)){
    //             const response = await this.create({name: tag})
    //             if(response.success) enhancedTags.push(response.data)
    //         }else{
    //             const response = await this.search("", {filter: `name = "${tag}"`})
    //             if(response.data) {
    //                 enhancedTags.push({name: tag, uuid: response.data.hits[0].uuid})
    //             }
    //
    //         }
    //     }
    //     return enhancedTags
    }
}