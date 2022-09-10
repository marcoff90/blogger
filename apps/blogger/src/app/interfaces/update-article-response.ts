export interface UpdateArticleResponse {
  id: number;
  title: string;
  perex: string;
  content: string;
  image: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}
