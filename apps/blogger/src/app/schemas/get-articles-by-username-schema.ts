import {AnyZodObject, object, string, TypeOf} from "zod";

export const getArticlesByUsernameSchema: AnyZodObject = object({
  params: object({
    username: string({
      required_error: 'Username is required'
    })
  }),
});

export type GetArticlesByUsernameInput = TypeOf<typeof getArticlesByUsernameSchema>;
