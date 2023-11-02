import {z} from "zod";
import {Index, MeiliSearch} from "meilisearch";
import {Tag, TagType, tagZod} from "~/app/tag";



export const contactZod = z.object({
    telephone_numbers: z.array(z.string()),
    emails: z.array(z.string()),
})

export const lecturerZod = z.object({
    uuid: z.string(),
    title_before: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    title_after: z.string().optional(),
    picture_url: z.string().optional(),
    location: z.string().optional(),
    claim: z.string().optional(),
    bio: z.string().optional(),
    price_per_hour: z.number().optional(),
    tags: z.array(tagZod).optional(),
    contact: contactZod.optional()
})

export const updatedLectureZod = lecturerZod.partial()

export type LecturerType = z.infer<typeof lecturerZod>

export const createParam = lecturerZod.merge(z.object({
    tags: z.array(tagZod.omit({
        uuid: true
    })).optional()
})).omit({
    uuid: true
})

export class Lecturer {
    index: Index<LecturerType>
    tag: Tag

    constructor(
        private meilisearch: MeiliSearch
    ) {
        this.index = meilisearch.index<LecturerType>("lecturers")
        this.tag = new Tag(meilisearch)
    }


    async create(lecturer: z.infer<typeof createParam>) {
        try {
            const uuid = crypto.randomUUID()
            const foundTagsNames:string[] = []
            const enhancedTags:TagType[] = []

            if (lecturer.tags) {

                const response = await this.tag.search("", {
                    filter: [lecturer.tags.map(i => `name = "${i.name}"`)],
                    limit: 200
                })

                if (response.data){
                    foundTagsNames.push(...response.data.hits.map(i=>i.name))
                }

                for (const tag of lecturer.tags) {

                    if (!foundTagsNames.includes(tag.name)){
                        const response = await this.tag.create({name: tag.name})
                        if(response.success) enhancedTags.push(response.data)
                    }
                }
            }



            await this.index.addDocuments([lecturerZod.parse({
                ...lecturer,
                tags: enhancedTags,
                uuid: uuid
            })])
            return {success: true, data: {uuid: uuid, ...lecturer, tags: enhancedTags}}
        }catch(e){
            console.log(e)
            return {success: false}
        }
    }

    async delete(id: string){
        try {
            await this.index.deleteDocument(id);
            return {success: true}
        }catch (e) {
            console.log(e)
            return {success: false}
        }
    }

    async get(id: string){
        try {
            const result = (await this.index.search(id)).hits[0];
            return {success: true, data: result}
        }catch (e) {
            console.log(e)
            return {success: false}
        }
    }

    async update(lecturer: z.TypeOf<typeof updatedLectureZod>){
        try {
            await this.index.updateDocuments([updatedLectureZod.parse(lecturer)])
            return {success: true}
        } catch (e) {
            console.log(e)
            return {success: false}
        }
    }

}