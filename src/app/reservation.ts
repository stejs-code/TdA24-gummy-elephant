import {z} from "zod";
import type {MeiliSearch, SearchParams, SearchResponse} from "meilisearch";
import {MeiliSearchApiError} from "meilisearch";
import type {NotificationType, ReservationType} from "~/app/zod";
import {createReservationBody, reservationZod, updateReservationBodyZod, zodErrorToString} from "~/app/zod";
import {ApiError} from "~/app/apiError";
import sanitizeHtml from 'sanitize-html';
import type {Context} from "./context";
import {removeUnknownTag} from "~/app/tag";
import {createNotification} from "./notification";

export function getReservationIndex(meili: MeiliSearch) {
    return meili.index<ReservationType>('reservations')
}

export function getUnix(date: Date) {
    return Math.floor(date.getTime() / 1000)
}

export async function searchReservation({meili}: Context, query: string, options?: SearchParams): Promise<SearchResponse<ReservationType> | ApiError> {
    try {
        const index = getReservationIndex(meili);

        return await index.search(query, options)
    } catch (e) {
        console.error("Error while searching reservation", options, e)

        return ApiError.internal()
    }
}

export async function createReservation(ctx: Context, rawData: z.input<typeof createReservationBody>): Promise<ReservationType | ApiError> {
    try {
        const index = getReservationIndex(ctx.meili)
        const data = createReservationBody.parse(rawData)

        const reservation: ReservationType = {
            ...data,
            tags: [],
            uuid: crypto.randomUUID(),
        }

        if (data.note) reservation.note = sanitizeHtml(data.note)

        if (data.tags) reservation.tags = await removeUnknownTag(ctx, data.tags)

        await ctx.meili.tasks.waitForTask((await index.addDocuments([reservation])).taskUid)

        const notification: Omit<NotificationType, "uuid"> = {
            reservation: reservation.uuid,
            lecturer: reservation.lecturer,
            created_at: reservation.createdAt,
            created_unix: reservation.createdUnix,
            read: false,
            data: {
                type: "new_lecture",
                message: `${reservation.dateAt.getDate()}. ${reservation.dateAt.getMonth() + 1}. ${reservation.dateAt.getFullYear()} ${reservation.hourStart}:00-${reservation.hourEnd}:00`
            }
        }
        await createNotification(ctx, notification);

        return reservation

    } catch (e) {
        if (e instanceof z.ZodError) {
            return new ApiError(400, `parse error: ${zodErrorToString(e)}`)
        }

        console.error("Error while creating user", rawData)

        return ApiError.internal()
    }
}

export async function deleteReservation(ctx: Context, uuid: string): Promise<ApiError | { success: true }> {
    try {
        const index = getReservationIndex(ctx.meili)
        const reservation = await getReservation(ctx, uuid)

        if (reservation instanceof ApiError) return reservation

        await ctx.meili.tasks.waitForTask((await index.deleteDocument(uuid)).taskUid)

        return {success: true}
    } catch (e) {
        console.error("Error while deleting reservation", uuid, e)
        return ApiError.internal()
    }
}

export async function getReservation({meili}: Context, uuid: string): Promise<ApiError | ReservationType> {
    try {
        return await getReservationIndex(meili).getDocument(uuid);
    } catch (e) {
        if (e instanceof MeiliSearchApiError) {
            return new ApiError(404, "Not found")
        }

        console.error("Error while getting reservation", uuid, e)

        return ApiError.internal()
    }
}

export async function updateReservation(ctx: Context, uuid: string, rawData: z.TypeOf<typeof updateReservationBodyZod>): Promise<ApiError | ReservationType> {
    try {
        const index = getReservationIndex(ctx.meili)
        const data = updateReservationBodyZod.parse(rawData)

        const previousReservation = await getReservation(ctx, uuid)

        if (previousReservation instanceof ApiError) return previousReservation

        const reservation: ReservationType = {
            ...previousReservation,
            ...data
        } as ReservationType

        if (data.tags) reservation.tags = await removeUnknownTag(ctx, data.tags)

        await index.updateDocuments([{
            ...reservation,
        }])

        return reservation
    } catch (e) {
        console.error("Error while updating reservation", uuid, rawData, e)

        return ApiError.internal()
    }
}

export async function listReservations({meili}: Context) {
    try {
        return (await getReservationIndex(meili).search("", {
            sort: [
                "uuid:desc"
            ],
            limit: 1000
        })).hits.map(reservation => reservationZod.parse(reservation))
    } catch (e) {
        console.error("Error while listing reservations", e)
        return ApiError.internal()
    }
}

export async function updateBulkReservations(ctx: Context, reservations: ReservationType[]): Promise<ApiError | {
    success: true
}> {
    try {
        const index = getReservationIndex(ctx.meili)
        await ctx.meili.tasks.waitForTasks((await index.updateDocumentsInBatches(reservations, 20)).map(i => i.taskUid))

        return {
            success: true
        }
    } catch (e) {
        console.error("Error while bulk updating lecturers")

        return ApiError.internal()
    }
}

export async function getLecturerReservations(ctx: Context, lecturer: string, date: Date | undefined = undefined): Promise<ApiError | ReservationType[]> {
    try {
        const index = getReservationIndex(ctx.meili)
        if (date === undefined) {
            return (await index.getDocuments({filter: `lecturer = ${lecturer}`})).results
        } else {
            const iso = date.toISOString().slice(0 , 10) + "T00:00:00.000Z"
            return (await index.getDocuments({filter: `lecturer = ${lecturer} AND dateAt = "${iso}"`})).results
        }

    } catch (e) {
        console.error("Error while get lecturer reservations.", e)

        return ApiError.internal()
    }

}
