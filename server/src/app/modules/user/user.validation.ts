import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    // name: z.object({
    //   firstName: z.string(),
    //   lastName: z.string(),
    // }),
    firstName: z.string({
      required_error: 'firstName is required ',
    }),
    lastName: z.string({
      required_error: 'lastName is required ',
    }),
    email: z.string({
      required_error: 'Email is required ',
    }),
    password: z.string({
      required_error: 'Password is required ',
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
  }),
});
const forgetPasswordZodSchema = z.object({
  body: z.object({
    token: z.string({
      required_error: 'Token is required ',
    }),
    newPassword: z
      .string({
        required_error: 'Password is required ',
      })
      .length(6, { message: 'Password length should be 6 characters' }),
  }),
});

export const UserValidaion = {
  updateUserZodSchema,
  forgetPasswordZodSchema,
  createUserZodSchema,
};
