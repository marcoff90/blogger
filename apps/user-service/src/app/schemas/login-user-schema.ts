import {AnyZodObject, object, string, TypeOf} from "zod";

export const loginUserSchema: AnyZodObject = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>;
