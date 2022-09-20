import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getAdminArticlesQuery = gql`
  query Query($userId: Int) {
    getAdminArticles(userId: $userId) {
      id
      title
      perex
      created_at
      updated_at
      username
      comments {
        id
        children {
          id
          children {
            id
            children {
              id
            }
          }
        }
      }
    }
  }
`;

interface Params {
  userId?: number;
  token?: string;
}

const articleKey = (userId?: number): Key => ['adminArticles', userId];

type Key = [string, number?];

interface ArticleResponse {
  getAdminArticles: ArticleI[]
}

export const useGetAdminArticlesQuery = (params: Params, disabled?: boolean) => {
  graphqlClient.setHeader('Authorization', `Bearer ${params.token}`);
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articleKey(params.userId), async () => {
    return graphqlClient.request(getAdminArticlesQuery, {userId: params.userId});
  }, {
    enabled: !disabled,
  });
};
