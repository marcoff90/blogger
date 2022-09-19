import {GraphQLResponse} from "graphql-request/dist/types";
import {useQuery} from "react-query";
import {ArticleI} from "../../interfaces/articleI";
import graphqlClient from "./client/graphql-client";
import {gql} from "graphql-request";

const getFeaturedArticlesGraphQLQuery = gql`
  query Query {
    getFeaturedArticles {
      id
      title
      perex
      image
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

type Key = [string];
export const articlesKey = (): Key => ['featuredArticles'];

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





