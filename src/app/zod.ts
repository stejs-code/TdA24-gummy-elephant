import {z} from "zod";

export const errorZod = z.object({
    code: z.number(),
    message: z.string()
})

export const tagZod = z.object({
    uuid: z.string(),
    name: z.string(),
    alias: z.string()
})

export type TagType = z.infer<typeof tagZod>

export const contactZod = z.object({
    telephone_numbers: z.array(z.string()),
    emails: z.array(z.string()),
})


export const notificationZod = z.object({
    uuid: z.string().uuid(),
    lecturer: z.string().uuid(),
    created_at: z.date(),
    created_unix: z.number(),
    read: z.boolean(),
    data: z.object({
        type: z.literal("new_lecture"),
        message: z.string()
    })
})

export type NotificationType = z.infer<typeof notificationZod>

export const lecturerZod = z.object({
    uuid: z.string().uuid(),
    password: z.string().optional().nullish().transform(x => x ?? null),
    username: z.string().optional().nullish().transform(x => x ?? null),
    title_before: z.string().nullish().transform(x => x ?? null),
    first_name: z.string(),
    middle_name: z.string().nullish().transform(x => x ?? null),
    last_name: z.string(),
    title_after: z.string().nullish().transform(x => x ?? null),
    route_url: z.string().nullish().transform(x => x ?? null),
    picture_url: z.string().nullish().transform(x => x ?? null),
    location: z.string().nullish().transform(x => x ?? null),
    claim: z.string().nullish().transform(x => x ?? null),
    bio: z.string().nullish().transform(x => x ?? null),
    price_per_hour: z.number().nullish().transform(x => x ?? null),
    tags: z.array(tagZod).optional(),
    contact: contactZod.optional()
})

export type LecturerType = z.infer<typeof lecturerZod>

export function zodErrorToString(zodError: z.ZodError) {
    return zodError.issues.map(i => "\"" + i.path.join(".") + "\": " + i.message).join("; ")
}

export const createBody = lecturerZod.merge(z.object({
    tags: z.array(tagZod.omit({
        uuid: true,
        alias: true
    })).optional()
})).omit({
    uuid: true
})

export const updateLectureBodyZod = createBody.partial()
