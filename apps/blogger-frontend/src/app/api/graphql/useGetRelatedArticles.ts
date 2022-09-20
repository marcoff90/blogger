import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getRelatedArticlesQuery = gql`
  query Query($username: String) {
    getArticlesByUsername(username: $username) {
      id
      title
      perex
    }
  }
`;

type Key = [string, Params];

interface Params {
  username?: string;
}

const articlesKey = (params: Params): Key => ['relatedArticles', params ?? {}];

interface ArticleResponse {
  getArticlesByUsername: ArticleI[]
}

export const useGetRelatedArticlesQuery = (params: Params, disabled?: boolean) => {
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articlesKey(params), async () => {
    return graphqlClient.request(getRelatedArticlesQuery, params);
  }, {
    enabled: !disabled,
  })
};
