import {VoteI} from "./voteI";

export interface CommentI {
  id: number;
  author: string;
  content: string;
  article_id: number;
  parent_id: number;
  created_at: number;
  votes: VoteI[];
  children: CommentI[]
}
