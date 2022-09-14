import {AnyZodObject, object, string, TypeOf} from 'zod';

export const getCommentsSchema: AnyZodObject = object({
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    })
  })
});

export type GetCommentsSchema = TypeOf<typeof getCommentsSchema>;
