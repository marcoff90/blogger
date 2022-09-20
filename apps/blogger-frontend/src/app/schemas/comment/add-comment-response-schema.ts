import {number, object, string} from "zod";

export const addCommentResponseSchema = object({
  id: number({
    required_error: 'Id is missing'
  }),
  depth: number({
    required_error: 'Depth is missing'
  }),
  created_at: number({
    required_error: 'Created at is missing'
  }),
  author: string({
    required_error: 'Author is missing'
  }),
  content: string({
    required_error: 'Content is missing'
  }),
  parent_id: number({
    required_error: 'Parent id is missing'
  }).nullable(),
  article_id: number({
    required_error: 'Article id is missing'
  })
}).strict();
