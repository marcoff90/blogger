import {object, string, TypeOf} from "zod";

export const getVotesForArticleCommentSchema = object({
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    })
  })
});

export type GetVotesForArticleCommentsInput = TypeOf<typeof getVotesForArticleCommentSchema>;
