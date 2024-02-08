import {z} from 'zod'

const filterSchema = z.object({
    type: z.string(),
    option: z.object({
        text: z.string(),
        tbs: z.string()
    })
});

export const filterArraySchema = z.array(filterSchema);

export type filter = z.infer<typeof filterSchema>