import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getArticlesByUsernameQuery = gql`
  query Query($username: String) {
    getArticlesByUsername(username: $username) {
      id
      title
      perex
      image
      created_at
      updated_at
      username
      comments {
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
  username?: string
}

type Key = [string, Params];

interface ArticleResponse {
  getArticlesByUsername: ArticleI[]
}

const articlesKey = (param?: Params): Key => ['articles', param ?? {}];

export const useGetArticlesByUsernameQuery = (param: Params, disabled?: boolean) => {
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articlesKey(param), async () => {
    return graphqlClient.request(getArticlesByUsernameQuery, param);
  }, {
    enabled: !disabled,
  })
};
