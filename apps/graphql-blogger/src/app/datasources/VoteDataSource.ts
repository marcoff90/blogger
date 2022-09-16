import { RESTDataSource } from "apollo-datasource-rest";

export class VoteDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env['VOTES_SERVICE_URL']}:${process.env['PORT_VOTES']}/votes-service-api`
  }

  async getVotesForComment(articleId: number, commentId: number) {
    return this.get(`/articles/${articleId}/comments/${commentId}/votes`);
  }
}
