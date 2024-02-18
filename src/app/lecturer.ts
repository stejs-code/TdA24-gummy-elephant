import {z} from "zod";
import type {Index, MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import {Tag} from "~/app/tag";
import type {LecturerType, TagType} from "~/app/zod";
import {createBody, lecturerZod, updateLectureBodyZod, zodErrorToString} from "~/app/zod";
import {ApiError} from "~/app/apiError";
import sanitizeHtml from 'sanitize-html';
import type {EnvGetter} from "@builder.io/qwik-city/middleware/request-handler";
import {getMeilisearch} from "~/app/meilisearch";
import bcrypt from "bcryptjs"

export class Lecturer {
    index: Index<LecturerType>
    tag: Tag

    constructor(
        private meilisearch: MeiliSearch
    ) {
        this.index = meilisearch.index<LecturerType>("lecturers")
        this.tag = new Tag(meilisearch)
    }

    static use(env: EnvGetter): Lecturer {
        return new Lecturer(getMeilisearch(env))
    }

    async search(query: string, options?: SearchParams): Promise<SearchResponse<LecturerType> | ApiError> {
        try {
            const result = await this.index.search(query, options)
            const newLecturer = result.hits.map(l => ({
                ...l,
                password: ""
            }))
            return {...result, hits: newLecturer}

        } catch (e) {
            console.error("Error while searching lecturer", options, e)

            return ApiError.internal()
        }
    }

    async doesUrlExist(url: string): Promise<boolean> {
        const response = await this.search("", {
            filter: [`route_url = ${url}`]
        })

        return !(response instanceof ApiError || response.hits.length === 0);
    }

    async createUrl(lecturer: LecturerType) {
        const url = [lecturer.title_before, lecturer.first_name, lecturer.middle_name, lecturer.last_name, lecturer.title_after]
            .filter((i): i is string => !!i)
            .map(i => i.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            .join("-")
            .toLowerCase()

        if (await this.doesUrlExist(url)) {
            console.log(`url already exists, uuid: ${lecturer.uuid}`)
            return lecturer.uuid
        }

        return url
    }

    static encryptPassword(password: string): Promise<string> {
        return bcrypt.genSalt(10)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash)
    }

    static async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }

    static getName(lecturer: LecturerType) {
        return [lecturer.title_before, lecturer.first_name, lecturer.middle_name, lecturer.last_name, lecturer.title_after].filter(i => i).join(" ")
    }

    async create(rawData: z.infer<typeof createBody>): Promise<LecturerType | ApiError> {
        try {
            const data = createBody.parse(rawData)

            const lecturer: LecturerType = {
                ...data,
                tags: [],
                uuid: crypto.randomUUID(),
            }

            if (lecturer.password) lecturer.password = await Lecturer.encryptPassword(lecturer.password)

            lecturer.route_url = await this.createUrl(lecturer)

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
            const lecturer = (await this.index.getDocument(uuid));
            return {...lecturer, password: ""};

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
                ...data
            } as LecturerType

            if (lecturer.password) lecturer.password = await Lecturer.encryptPassword(lecturer.password)

            if (!data.route_url) {
                lecturer.route_url = await this.createUrl(lecturer)
            } else {
                if (await this.doesUrlExist(data.route_url)) {
                    lecturer.route_url = lecturer.uuid
                }
            }

            if (data.tags) lecturer.tags = await this.processTags(data.tags)

            await this.index.updateDocuments([lecturer])

            return {...lecturer, password: ""}
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
            })).hits.map(lecturer => lecturerZod.parse({...lecturer, password: ""}))
        } catch (e) {
            console.error("Error while listing lecturers", e)
            return ApiError.internal()
        }
    }

    /**
     * Only for simple non-computation updates
     * @param lecturers
     */
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

    private async processTags(tags: Omit<TagType, "uuid" | "alias">[]): Promise<TagType[]> {
        // assure unique values
        const uniqueTags = [...new Set(tags.map(i => i.name))].map(i => ({name: i}))

        // create unregistered tags
        return (await Promise.all(uniqueTags
            .map(i => this.tag.assureTagExistence(i))))
            .filter((i): i is TagType => !(i instanceof ApiError));
    }

}
