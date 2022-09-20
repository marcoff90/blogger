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
  state?: string;
  commentsCount?: number;
  comments?: CommentI[]
}

export const isArticle = (obj: any): obj is ArticleI => {
  return 'id' in obj && 'title' in obj && 'perex' in obj && 'content' in obj && 'image'
    in obj && 'created_at' in obj && 'updated_at' in obj && 'username' in obj && 'comments' in obj;
};
