import {AnyZodObject, object, string, TypeOf} from "zod";

export const createGetServesSchema: AnyZodObject = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetServers = TypeOf<typeof createGetServesSchema>;
