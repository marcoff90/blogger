import {object, string, TypeOf} from "zod";

export const getArticleIdsSchema = object({
  headers: object({
    'x-api-key': string({
      required_error: 'Api key is required'
    })
  })
});

export type GetArticleIdsInput = TypeOf<typeof getArticleIdsSchema>;
