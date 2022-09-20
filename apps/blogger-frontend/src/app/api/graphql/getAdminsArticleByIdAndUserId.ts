import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getArticleByUserIdAndIdAdminQuery = gql`
  query Query($userId: Int, $articleId: Int) {
    getArticleByUserIdAndIdAdmin(articleId: $articleId, userId: $userId) {
      id
      title
      perex
      content
      state
      image
      created_at
      updated_at
      username
    }
  }
`;

interface Params {
  userId?: number;
  articleId?: number;
}

const articleKey = (params?: Params): Key => ['article', params ?? {}];

type Key = [string, Params];

interface ArticleResponse {
  getArticleByUserIdAndIdAdmin: ArticleI
}

export const useGetArticleByUserIdAndIdAdminQuery = (params: Params, disabled?: boolean) => {
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articleKey(params), async () => {
    return graphqlClient.request(getArticleByUserIdAndIdAdminQuery, params);
  }, {
    enabled: !disabled,
  })
};
