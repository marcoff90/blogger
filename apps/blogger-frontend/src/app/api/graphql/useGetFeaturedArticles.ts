import {GraphQLResponse} from "graphql-request/dist/types";
import {useQuery} from "react-query";
import {ArticleI} from "../../interfaces/articleI";
import graphqlClient from "./client/graphql-client";

const getFeaturedArticlesGraphQLQuery = `
  query Query {
    getFeaturedArticles {
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
export const articlesKey = (): Key => ['articles'];

interface ArticleResponse {
  getFeaturedArticles: ArticleI[]
}

export const useGetFeaturedArticlesQuery = (disabled?: boolean) => {
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articlesKey(), async () => {
    return graphqlClient.request(getFeaturedArticlesGraphQLQuery);
  }, {
    enabled: !disabled,
  })
};





