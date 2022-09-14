import {object, string, TypeOf, number, AnyZodObject} from 'zod';

export const createCommentSchema: AnyZodObject = object({
  body: object({
    author: string({
      required_error: 'Author is required'
    }),
    content: string({
      required_error: 'Content of the comment is required'
    }),
    parent_id: number().optional()
  }),
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    })
  })
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;
