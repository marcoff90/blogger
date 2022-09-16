import {AnyZodObject, object, string, TypeOf} from "zod";

export const getUsersDataSchema: AnyZodObject = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetUsersDataInput = TypeOf<typeof getUsersDataSchema>;
