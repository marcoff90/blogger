import {AnyZodObject, object, string, TypeOf} from "zod";

export const getCommentsIdsSchema: AnyZodObject = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetCommentsIdsInput = TypeOf<typeof getCommentsIdsSchema>;
