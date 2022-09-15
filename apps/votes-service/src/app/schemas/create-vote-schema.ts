import {AnyZodObject, boolean, object, string, TypeOf} from "zod";

export const createVoteSchema: AnyZodObject = object({
  body: object({
    upvote: boolean({
      required_error: 'Upvote value is required'
    }).nullable(),
    downvote: boolean({
      required_error: 'Downvote value is required'
    }).nullable(),
  }),
  params: object({
    articleId: string({
      required_error: 'Article ID is required'
    }),
    commentId: string({
      required_error: 'Comment ID is required'
    })
  })
});

export type CreateVoteInput = TypeOf<typeof createVoteSchema>;
