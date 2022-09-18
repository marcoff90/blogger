import {CommentI} from "./commentI";

export interface ArticleI {
  id: number;
  title: string;
  perex: string;
  content: string;
  image: string;
  created_at: number;
  updated_at: number;
  username: string;
  commentsAmount?: number;
  comments?: CommentI[]
}
