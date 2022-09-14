import {AnyZodObject, object, string, TypeOf} from "zod";

export const getArticlesByUserIdSchema: AnyZodObject = object({
  headers: object({
    authorization: string({
      required_error: 'Bearer token is required'
    })
  }),
  params: object({
    userId: string({
      required_error: 'User ID is required'
    })
  })
});

export type GetArticlesByUserIdInput = TypeOf<typeof getArticlesByUserIdSchema>;
