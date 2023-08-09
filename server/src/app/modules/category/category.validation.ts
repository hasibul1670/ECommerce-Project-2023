import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Category Name is required ',
    }),
  }),
});
const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const CategoryValidaion = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
