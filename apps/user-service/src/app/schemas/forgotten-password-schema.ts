import {object, string, TypeOf} from "zod";

export const forgottenUserPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type ForgottenUserPasswordInput = TypeOf<typeof forgottenUserPasswordSchema>;
