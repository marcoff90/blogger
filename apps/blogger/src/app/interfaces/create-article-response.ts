import {State} from "../models/article-model";

export interface CreateArticleResponse {
  id: number;
  title: string;
  state: State,
  image: string;
  created_at: number;
}
