import {AnyZodObject, object, string, TypeOf} from "zod";

export const activateUserAccountSchema: AnyZodObject = object({
  body: object({
    avatar: string({
      required_error: 'Avatar must be provided',
    }),
  }),
  query: object({
    token: string({
      required_error: 'Confirmation token is required',
    }),
  }),
});

export type ActivateUserAccountInput = TypeOf<typeof activateUserAccountSchema>;
