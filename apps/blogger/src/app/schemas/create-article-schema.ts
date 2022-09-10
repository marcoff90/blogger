import {object, string, TypeOf, nativeEnum, number} from 'zod';
import {State} from "../models/article-model";

export const createArticleSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    perex: string({
      required_error: 'Perex is required'
    })
    .min(50, {message: 'Must be at least 50 characters'})
    .max(250, {message: 'Must be shorter than 250 characters'}),
    content: string({
      required_error: 'Content of the article is required'
    }),
    image: string({
      required_error: 'Image address is required'
    }),
    state: nativeEnum(State, {
      required_error: 'State is required'
    })
  }),
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

export type CreateArticleInput = TypeOf<typeof createArticleSchema>;
