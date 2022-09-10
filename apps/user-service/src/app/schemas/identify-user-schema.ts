import {object, string, TypeOf} from "zod";

export const identifyUserByResetTokenSchema = object({
  query: object({
    token: string({
      required_error: 'Reset password token is required',
    }),
  }),
});

export type IdentifyUserByResetTokenInput = TypeOf<typeof identifyUserByResetTokenSchema>;
