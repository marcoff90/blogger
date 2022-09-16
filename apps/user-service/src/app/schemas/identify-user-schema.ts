import {AnyZodObject, object, string, TypeOf} from "zod";

export const identifyUserByResetTokenSchema: AnyZodObject = object({
  query: object({
    token: string({
      required_error: 'Reset password token is required',
    }),
  }),
});

export type IdentifyUserByResetTokenInput = TypeOf<typeof identifyUserByResetTokenSchema>;
