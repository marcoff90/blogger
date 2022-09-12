import { State } from "../models/article-model";

export interface GetUserArticleResponse {
  id: number;
  title: string;
  perex: string;
  content: string;
  state: State;
  image: string;
  created_at: number;
  updated_at: number;
  username?: string;
}
