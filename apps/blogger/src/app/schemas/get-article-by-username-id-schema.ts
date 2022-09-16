import {AnyZodObject, object, string, TypeOf} from "zod";

export const getArticleByUsernameAndIdSchema: AnyZodObject = object({
  params: object({
    username: string({
      required_error: 'Username is required'
    }),
    articleId: string({
      required_error: 'Article ID is required'
    })
  }),
});

export type GetArticleByUsernameAndIdInput = TypeOf<typeof getArticleByUsernameAndIdSchema>;
