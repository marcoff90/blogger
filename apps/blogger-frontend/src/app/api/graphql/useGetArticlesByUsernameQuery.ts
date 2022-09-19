import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery, useQueryClient} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getArticlesByUsernameQuery = gql`
  query Query($username: String) {
    getArticlesByUsername(username: $username) {
      id
      title
      perex
      content
      image
      created_at
      updated_at
      username
      comments {
        id
        author
        content
        created_at
        parent_id
        votes {
          upvotes
          downvotes
        }
        children {
          id
          author
          content
          parent_id
          created_at
          votes {
            upvotes
            downvotes
          }
          children {
            id
            author
            content
            parent_id
            created_at
            votes {
              upvotes
              downvotes
            }
            children {
              id
              author
              content
              parent_id
              created_at
              votes {
                upvotes
                downvotes
              }
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
