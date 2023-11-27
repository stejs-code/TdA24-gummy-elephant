import {z} from "zod";

export const errorZod = z.object({
    code: z.number(),
    message: z.string()
})

export const tagZod = z.object({
    uuid: z.string(),
    name: z.string()
})

export type TagType = z.infer<typeof tagZod>

export const contactZod = z.object({
    telephone_numbers: z.array(z.string()),
    emails: z.array(z.string()),
})

export const lecturerZod = z.object({
    uuid: z.string().uuid(),
    title_before: z.string().optional().nullish().transform(x => x ?? undefined),
    first_name: z.string(),
    middle_name: z.string().optional().nullish().transform(x => x ?? undefined),
    last_name: z.string(),
    title_after: z.string().optional().nullish().transform(x => x ?? undefined),
    picture_url: z.string().optional().nullish().transform(x => x ?? undefined),
    location: z.string().optional().nullish().transform(x => x ?? undefined),
    claim: z.string().optional().nullish().transform(x => x ?? undefined),
    bio: z.string().optional().nullish().transform(x => x ?? undefined),
    price_per_hour: z.number().optional().nullish().transform(x => x ?? undefined),
    tags: z.array(tagZod).optional(),
    contact: contactZod.optional()
})

export type LecturerType = z.infer<typeof lecturerZod>

export function zodErrorToString(zodError: z.ZodError) {
    return zodError.issues.map(i => "\"" + i.path.join(".") + "\": " + i.message).join("; ")
}

export const createBody = lecturerZod.merge(z.object({
    tags: z.array(tagZod.omit({
        uuid: true
    })).optional()
})).omit({
    uuid: true
})

export const updateLectureBodyZod = createBody.partial()
