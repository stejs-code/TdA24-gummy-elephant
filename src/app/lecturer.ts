import {z} from "zod";
import type {MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import {Tag} from "~/app/tag";
import type {LecturerType, TagType} from "~/app/zod";
import {createBody, lecturerZod, updateLectureBodyZod, zodErrorToString} from "~/app/zod";
import {ApiError} from "~/app/apiError";
import sanitizeHtml from 'sanitize-html';
import bcrypt from "bcryptjs"
import { Context } from "./context";
import { assureTagExistence } from "./tag";

function getIndex(meili: MeiliSearch){
    return meili.index<LecturerType>('lecturers')
}

export async function searchLecturer({meili}: Context, query: string, options?: SearchParams): Promise<SearchResponse<LecturerType> | ApiError> {
    try {
        const index = getIndex(meili);
        const result = await index.search(query, options)
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

async function doesUrlExist(ctx: Context, url: string): Promise<boolean> {
    const response = await searchLecturer(ctx, "", {
        filter: [`route_url = ${url}`]
    })

    return !(response instanceof ApiError || response.hits.length === 0);
}

async function createUrl(ctx: Context, lecturer: LecturerType) {
    const url = [lecturer.title_before, lecturer.first_name, lecturer.middle_name, lecturer.last_name, lecturer.title_after]
        .filter((i): i is string => !!i)
        .map(i => i.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        .join("-")
        .toLowerCase()

    if (await doesUrlExist(ctx, url)) {
        console.log(`url already exists, uuid: ${lecturer.uuid}`)
        return lecturer.uuid
    }

    return url
}

async function encryptPassword(password: string): Promise<string> {
    return bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash)
}

async function comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
}

async function getLecturerName(lecturer: LecturerType) {
        return [lecturer.title_before, lecturer.first_name, lecturer.middle_name, lecturer.last_name, lecturer.title_after].filter(i => i).join(" ")
    }

export async function createLecturer(ctx: Context, rawData: LecturerType): Promise<LecturerType | ApiError> {
    try {
        const index = getIndex(ctx.meili)
        const data = createBody.parse(rawData)

        const lecturer: LecturerType = {
            ...data,
            tags: [],
            uuid: crypto.randomUUID(),
        }

        if (lecturer.password) lecturer.password = await encryptPassword(lecturer.password)

        lecturer.route_url = await createUrl(ctx, lecturer)

        if (data.bio) lecturer.bio = sanitizeHtml(data.bio)

        if (data.tags) lecturer.tags = await processTags(ctx, data.tags)

        await ctx.meili.tasks.waitForTask((await index.addDocuments([lecturer])).taskUid)

        return lecturer

    } catch (e) {
        if (e instanceof z.ZodError) {
            return new ApiError(400, `parse error: ${zodErrorToString(e)}`)
        }

        console.error("Error while creating user", rawData, e)

        return ApiError.internal()
    }
}
export async function deleteLecturer(ctx: Context, uuid: string): Promise<ApiError | { success: true }> {
    try {
        const index = getIndex(ctx.meili)
        const lecturer = await getLecturer(ctx, uuid)

        if (lecturer instanceof ApiError) return lecturer

        await ctx.meili.tasks.waitForTask((await index.deleteDocument(uuid)).taskUid)

        return {success: true}
    } catch (e) {
        console.error("Error while deleting lecturer", uuid, e)
        return ApiError.internal()
    }
}

export async function getLecturer({meili}: Context, uuid: string): Promise<ApiError | LecturerType> {
    try {
        const lecturer = (await getIndex(meili).getDocument(uuid));
        return {...lecturer, password: ""};

    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }

        console.error("Error while getting lecturer", uuid, e)

        return ApiError.internal()
    }
}

export async function updateLecturer(ctx: Context, uuid: string, rawData: z.TypeOf<typeof updateLectureBodyZod>): Promise<ApiError | LecturerType> {
    try {
        const index = getIndex(ctx.meili)
        const data = updateLectureBodyZod.parse(rawData)

        const previousLecturer = await getLecturer(ctx, uuid)

        if (previousLecturer instanceof ApiError) return previousLecturer

        const lecturer: LecturerType = {
            ...previousLecturer,
            ...data
        } as LecturerType

        if (lecturer.password) lecturer.password = await encryptPassword(lecturer.password)

        if (!data.route_url) {
            lecturer.route_url = await createUrl(ctx, lecturer)
        } else {
            if (await doesUrlExist(ctx, data.route_url)) {
                lecturer.route_url = lecturer.uuid
            }
        }

        if (data.tags) lecturer.tags = await processTags(ctx, data.tags)

            await index.updateDocuments([{
                ...lecturer,
                password: (!lecturer.password || lecturer.password === "") ? undefined : lecturer.password
            }])

        return {...lecturer, password: ""}
    } catch (e) {
        console.error("Error while updating lecturer", uuid, rawData, e)

        return ApiError.internal()
    }
}

export async function listLecturers({meili}: Context) {
    try {
        return (await getIndex(meili).search("", {
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

export async function updateBulkLecturers(ctx: Context, lecturers: LecturerType[]): Promise<ApiError | { success: true }> {
    try {
        const index = getIndex(ctx.meili)
        await ctx.meili.tasks.waitForTasks((await index.updateDocumentsInBatches(lecturers, 20)).map(i => i.taskUid))

        return {
            success: true
        }
    } catch (e) {
        console.error("Error while bulk updating lecturers")

        return ApiError.internal()
    }
}

export async function processTags(ctx: Context, tags: Omit<TagType, "uuid" | "alias">[]): Promise<TagType[]> {
    // assure unique values
    const uniqueTags = [...new Set(tags.map(i => i.name))].map(i => ({name: i}))

    // create unregistered tags
    return (await Promise.all(uniqueTags
        .map(i => assureTagExistence(ctx, i))))
        .filter((i): i is TagType => !(i instanceof ApiError));
}