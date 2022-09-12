import {object, string, TypeOf} from 'zod';

export const getCommentsSchema = object({
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    })
  })
});

export type GetCommentsSchema = TypeOf<typeof getCommentsSchema>;
