import {number, object, string} from "zod";

export const updateArticleResponseSchema = object({
  id: number({
    required_error: 'Id is missing'
  }),
  title: string({
    required_error: 'Title is missing'
  }),
  perex: string({
    required_error: 'Title is missing'
  }),
  content: string({
    required_error: 'Title is missing'
  }),
  state: string({
    required_error: 'State is missing'
  }),
  image: string({
    required_error: 'Image id is missing'
  }).nullable(),
  created_at: number({
    required_error: 'Created At is missing'
  }),
  updated_at: number({
    required_error: 'Created At is missing'
  })
}).strict();
