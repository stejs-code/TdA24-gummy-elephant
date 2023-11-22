import {z} from "zod";
import type {Index, MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import { MeiliSearchApiError} from "meilisearch";
import {Tag} from "~/app/tag";
import type { LecturerType, TagType} from "~/app/zod";
import {createBody, lecturerZod, updateLectureBodyZod, zodErrorToString} from "~/app/zod";
import {ApiError} from "~/app/apiError";
import sanitizeHtml from 'sanitize-html';

export class Lecturer {
    index: Index<LecturerType>
    tag: Tag

    constructor(
        private meilisearch: MeiliSearch
    ) {
        this.index = meilisearch.index<LecturerType>("lecturers")
        this.tag = new Tag(meilisearch)
    }

    async search(query: string, options?: SearchParams): Promise<SearchResponse<LecturerType> | ApiError> {
        try {
            return await this.index.search(query, options)

        } catch (e) {
            console.error("Error while searching lecturer", options, e)

            return ApiError.internal()
        }
    }

    async create(rawData: z.infer<typeof createBody>): Promise<LecturerType | ApiError> {
        try {
            const data = createBody.parse(rawData)

            const lecturer: LecturerType = {
                ...data,
                tags: [],
                uuid: crypto.randomUUID()
            }

            if (data.bio) lecturer.bio = sanitizeHtml(data.bio)

            if (data.tags) lecturer.tags = await this.processTags(data.tags)

            await this.meilisearch.tasks.waitForTask((await this.index.addDocuments([lecturer])).taskUid)

            return lecturer

        } catch (e) {
            if (e instanceof z.ZodError) {
                return new ApiError(400, `parse error: ${zodErrorToString(e)}`)
            }

            console.error("Error while creating user", rawData, e)

            return ApiError.internal()
        }
    }

    async delete(uuid: string): Promise<ApiError | { success: true }> {
        try {
            const lecturer = await this.get(uuid)

            if (lecturer instanceof ApiError) return lecturer

            await this.meilisearch.tasks.waitForTask((await this.index.deleteDocument(uuid)).taskUid)

            return {success: true}
        } catch (e) {
            console.error("Error while deleting lecturer", uuid, e)
            return ApiError.internal()
        }
    }

    async get(uuid: string): Promise<ApiError | LecturerType> {
        try {
            return await this.index.getDocument(uuid)

        } catch (e) {
            if (e instanceof MeiliSearchApiError) {
                return new ApiError(404, "Not found")
            }

            console.error("Error while getting lecturer", uuid, e)

            return ApiError.internal()
        }
    }

    async update(uuid: string, rawData: z.TypeOf<typeof updateLectureBodyZod>): Promise<ApiError | LecturerType> {
        try {
            const data = updateLectureBodyZod.parse(rawData)

            const previousLecturer = await this.get(uuid)

            if (previousLecturer instanceof ApiError) return previousLecturer

            const lecturer: LecturerType = {
                ...previousLecturer,
                ...data,
                tags: []
            }

            if (data.tags) lecturer.tags = await this.processTags(data.tags)

            await this.index.updateDocuments([lecturer])

            return lecturer
        } catch (e) {
            console.error("Error while updating lecturer", uuid, rawData, e)

            return ApiError.internal()
        }
    }

    async list() {
        try {
            return (await this.index.search("", {
                sort: [
                    "last_name:desc",
                    "first_name:desc",
                    "uuid:desc"
                ],
                limit: 1000
            })).hits.map(i => lecturerZod.parse(i))
        } catch (e) {
            console.error("Error while listing lecturers", e)
            return ApiError.internal()
        }
    }

    async updateBulk(lecturers: LecturerType[]): Promise<ApiError | { success: true }> {
        try {
            await this.meilisearch.tasks.waitForTasks((await this.index.updateDocumentsInBatches(lecturers, 20)).map(i => i.taskUid))

            return {
                success: true
            }
        } catch (e) {
            console.error("Error while bulk updating lecturers")

            return ApiError.internal()
        }
    }

    private async processTags(tags: Omit<TagType, "uuid">[]): Promise<TagType[]> {
        // assure unique values
        const uniqueTags = [...new Set(tags.map(i => i.name))].map(i => ({name: i}))

        // create unregistered tags
        return (await Promise.all(uniqueTags
            .map(i => this.tag.assureTagExistence(i))))
            .filter((i): i is TagType => !(i instanceof ApiError));
    }

}