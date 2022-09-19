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

type Key = [string];

interface ArticleResponse {
  getArticleByUsernameAndId: ArticleI
}

export const useGetArticleByUsernameAndIdQuery = (username?: string, articleId?: number, disabled?: boolean) => {
  const articleKey = (): Key => [`${username}Article${articleId}`];

  return useQuery<GraphQLResponse, Error, ArticleResponse>(articleKey(), async () => {
    return graphqlClient.request(getArticlesByUsernameAndIdQuery, {username: username, articleId: articleId});
  }, {
    enabled: !disabled,
  })
};
