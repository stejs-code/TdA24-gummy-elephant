import {z} from "zod";
import type {Index, MeiliSearch, SearchParams} from "meilisearch";
import * as crypto from "crypto";



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

    async create(tag: Omit<TagType, "uuid">): ResponseType<TagType>{
        try{
            const uuid = crypto.randomUUID()
            await this.index.addDocuments([tagZod.parse({name: tag.name, uuid: uuid})])
            return {success: true, data: {uuid: uuid, name: tag.name}}
        }catch (e){
            console.log(e)
            return {success: false}
        }
    }

    async get(id: string){
        try {
            const result = (await this.index.getDocument(id))

            return {success: true, data: result}
        }catch (e) {
            console.log(e)
            return {success: false}
        }
    }

    async list() {
        try {
            const result = (await this.index.search("", {limit: 10000})).hits;

            return {success: true, data: result}
        }catch (e) {
            console.log(e)
            return {success: false}
        }
    }

    async search(query: string, options?: SearchParams){
        try {
            const response = await this.index.search(query, options)

            return {success: true, data: response}
        }catch (e) {
            console.log(e)

            return {success: false}
        }
    }

    async createMissingTags(tags: string[]){
        const foundTagsNames:string[] = []
        const enhancedTags:TagType[] = []

        const response = await this.search("", {
            filter: [tags.map(i => `name = "${i}"`)],
            limit: 200
        })

        if (response.data){
            foundTagsNames.push(...response.data.hits.map(i => i.name))
        }

        for (const tag of tags) {
            if (!foundTagsNames.includes(tag)){
                const response = await this.create({name: tag})
                if(response.success) enhancedTags.push(response.data)
            }else{
                const response = await this.search("", {filter: `name = "${tag}"`})
                if(response.data) {
                    enhancedTags.push({name: tag, uuid: response.data.hits[0].uuid})
                }

            }
        }
        return enhancedTags
    }
}