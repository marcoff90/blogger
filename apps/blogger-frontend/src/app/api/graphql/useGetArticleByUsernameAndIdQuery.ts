import {gql} from "graphql-request";
import {ArticleI} from "../../interfaces/articleI";
import {useQuery} from "react-query";
import {GraphQLResponse} from "graphql-request/dist/types";
import graphqlClient from "./client/graphql-client";

const getArticlesByUsernameAndIdQuery = gql`
  query Query($username: String, $articleId: Int) {
    getArticleByUsernameAndId(username: $username, articleId: $articleId) {
      id
      title
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

interface Params {
  username?: string;
  articleId?: number;
}

const articleKey = (params?: Params): Key => ['article', params ?? {}];

type Key = [string, Params];

interface ArticleResponse {
  getArticleByUsernameAndId: ArticleI
}

export const useGetArticleByUsernameAndIdQuery = (params: Params, disabled?: boolean) => {
  return useQuery<GraphQLResponse, Error, ArticleResponse>(articleKey(params), async () => {
    return graphqlClient.request(getArticlesByUsernameAndIdQuery, params);
  }, {
    enabled: !disabled,
  })
};
