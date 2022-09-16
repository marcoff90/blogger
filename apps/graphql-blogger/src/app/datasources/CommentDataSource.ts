import {RESTDataSource} from "apollo-datasource-rest";

export class CommentDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env['COMMENTS_SERVICE_URL']}:${process.env['PORT_COMMENTS']}/comments-service-api`
  }

  async getCommentsByArticleId(articleId: number) {
    return await this.get(`/articles/${articleId}/comments`)
  }
}
