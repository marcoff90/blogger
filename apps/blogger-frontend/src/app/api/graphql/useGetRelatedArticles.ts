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

type Key = [string];

interface ArticleResponse {
  getArticlesByUsername: ArticleI[]
}

export const useGetRelatedArticlesQuery = (username?: string, disabled?: boolean) => {
  const articlesKey = (): Key => [`${username}RelatedArticles`];

  return useQuery<GraphQLResponse, Error, ArticleResponse>(articlesKey(), async () => {
    return graphqlClient.request(getRelatedArticlesQuery, {username: username});
  }, {
    enabled: !disabled,
  })
};
