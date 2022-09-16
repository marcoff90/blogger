import {AnyZodObject, object, string, TypeOf} from "zod";

export const getArticleByUserIdArticleIdSchema: AnyZodObject = object({
  headers: object({
    authorization: string({
      required_error: 'Bearer token is required'
    })
  }),
  params: object({
    userId: string({
      required_error: 'User ID is required'
    }),
    articleId: string({
      required_error: 'Article ID is required'
    })
  })
});

export type GetArticleByUserIdArticleIdInput = TypeOf<typeof getArticleByUserIdArticleIdSchema>;
