import {object, string, TypeOf} from "zod";

export const getVotesForOneCommentSchema = object({
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    }),
    commentId: string({
      required_error: 'Comment ID is required'
    })
  })
});

export type GetVotesForOneCommentInput = TypeOf<typeof getVotesForOneCommentSchema>;
