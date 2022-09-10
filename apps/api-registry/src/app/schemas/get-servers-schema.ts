import {object, string, TypeOf} from "zod";

export const createGetServesSchema = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetServers = TypeOf<typeof createGetServesSchema>;
