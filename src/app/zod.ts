import {z} from "zod";

export const errorZod= z.object({
    code: z.number(),
    message: z.string()
})
export const tagZod = z.object({
    uuid: z.string(),
    name: z.string()
})
export const contactZod = z.object({
    telephone_numbers: z.array(z.string()),
    emails: z.array(z.string()),
})
export const lecturerZod = z.object({
    uuid: z.string().uuid(),
    title_before: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    title_after: z.string().optional(),
    picture_url: z.string().url().optional(),
    location: z.string().optional(),
    claim: z.string().optional(),
    bio: z.string().optional(),
    price_per_hour: z.number().optional(),
    tags: z.array(tagZod).optional(),
    contact: contactZod.optional()
})

export const updatedLectureZod = lecturerZod.partial()

export type LecturerType = z.infer<typeof lecturerZod>

export function zodErrorToString(zodError: z.ZodError) {
    zodError.toString()

}