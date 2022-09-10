import {object, string, TypeOf} from "zod";

export const getArticlesByUsernameSchema = object({
  params: object({
    username: string({
      required_error: 'Username is required'
    })
  }),
});

export type GetArticlesByUsernameInput = TypeOf<typeof getArticlesByUsernameSchema>;
