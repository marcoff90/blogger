import {RequestOptions, RESTDataSource} from "apollo-datasource-rest";
import 'dotenv/config';

export class ArticleDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env['BLOGGER_SERVICE_URL']}:${process.env['PORT_BLOGGER']}/blogger-service-api`
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getArticleByUserIdAndIdAdmin(articleId: number, userId: number) {
    return await this.get(`/bloggers/${userId}/articles/${articleId}`)
  }

  async getAdminArticles(userId: number) {
    return await this.get(`/bloggers/${userId}/articles`);
  }

  async getArticlesByUsername(username: string) {
    return await this.get(`/blogs/${username}/articles`);
  }

  async getFeaturedArticles() {
    return await this.get('/featured-blogs');
  }

  async getArticleByUsernameAndId(username: string, articleId: number) {
    return await this.get(`/blogs/${username}/articles/${articleId}`);
  }
}
