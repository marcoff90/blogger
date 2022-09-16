import {gql} from "apollo-server-express";

const typeDefs = gql(`
  type Article {
    id: Int!
    title: String!
    perex: String!
    content: String!
    state: String!
    image: String!
    created_at: Int!
    updated_at: Int!
    username: String
    commentsAmount: Int
    comments: [Comment]
    }

  type Comment {
    id: Int!
    author: String!
    content: String!
    article_id: Int!
    parent_id: Int
    created_at: Int!
    votes: [Votes]
    children: [Comment]
  }

  type Votes {
    upvotes: Int!,
    downvotes: Int!
  }

  # Queries
  type Query {
    getArticleByUserIdAndIdAdmin(articleId: Int, userId: Int): Article
    getAdminArticles(userId: Int): [Article]
    getArticlesByUsername(username: String): [Article]
    getFeaturedArticles: [Article]
    getArticleByUsernameAndId(username: String, articleId: Int): Article
  }
    `);

export default typeDefs;
