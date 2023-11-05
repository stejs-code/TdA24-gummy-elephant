import {z} from "zod";
import {Index, MeiliSearch, SearchParams} from "meilisearch";
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
            const enhancedTags = lecturer.tags ? await this.tag.createMissingTags(lecturer.tags.map(i => i.name)) : undefined;
            const data = enhancedTags ? {uuid: uuid, ...lecturer, tags: enhancedTags} : {uuid: uuid, ...lecturer};

            this.index.addDocuments([lecturerZod.parse(data)]);
            return { success: true, data: data};
        }catch(e){
            console.log(e)
            return {success: false}
        }
    }

    async delete(id: string){
        try {
            (await this.index.deleteDocument(id));
            return {success: true, data: (await this.index.deleteDocument(id))}
        }catch (e) {
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

    async update(lecturer: z.TypeOf<typeof updatedLectureZod>){
        try {
            const enhancedTags = lecturer.tags ? await this.tag.createMissingTags(lecturer.tags.map(i => i.name)) : undefined;
            const data = enhancedTags ? {...lecturer, tags: enhancedTags} : {...lecturer};

            await this.index.updateDocuments([updatedLectureZod.parse(data)])
            return {success: true, data: data}
        } catch (e) {
            console.log(e)
            return {success: false}
        }
    }

    async list(){
        try {

            return {success: true, data: (await this.index.search("", {limit: 1000})).hits}
        } catch (e) {
            console.log(e)
            return {success: false}
        }
    }



}