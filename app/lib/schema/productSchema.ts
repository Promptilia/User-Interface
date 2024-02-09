import {z} from 'zod'

export const productSchema = z.object({
    title: z.string(),
    product_link: z.string(),
    price: z.string(),
    rating: z.number(),
    delivery: z.string(),
});

export type product = z.infer<typeof productSchema>