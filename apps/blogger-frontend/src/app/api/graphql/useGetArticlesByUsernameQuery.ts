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

type Key = [string];

interface ArticleResponse {
  getArticlesByUsername: ArticleI[]
}

export const useGetArticlesByUsernameQuery = (username?: string, disabled?: boolean) => {
  const articlesKey = (): Key => [`${username}Articles`];

  return useQuery<GraphQLResponse, Error, ArticleResponse>(articlesKey(), async () => {
    return graphqlClient.request(getArticlesByUsernameQuery, {username: username});
  }, {
    enabled: !disabled,
  })
};
