
const resolvers= {
  Query: {
    getArticlesByUsername: async (_, {username}, {dataSources}) => { // * DONE
      return await dataSources.bloggerApi.getArticlesByUsername(username);
    },
    getFeaturedArticles: async (_, __, {dataSources}) => { // * DONE
      return await dataSources.bloggerApi.getFeaturedArticles();
    },
    getArticleByUserIdAndIdAdmin: async (_, {articleId, userId}, {dataSources}) => { // * DONE
      return await dataSources.bloggerApi.getArticleByUserIdAndIdAdmin(articleId, userId);
    },
    getAdminArticles: async(_, {userId}, {dataSources}) => {
      return await dataSources.bloggerApi.getAdminArticles(userId);
    },
    getArticleByUsernameAndId: async (_, {username, articleId}, {dataSources}) => {
      return await dataSources.bloggerApi.getArticleByUsernameAndId(username, articleId);
    }
  },
  Article: {
    comments: async (parent, __, {dataSources}) => {
      return await dataSources.commentApi.getCommentsByArticleId(parent.id);
    }
  },
  Comment: {
    votes: async (parent, __, {dataSources}) => {
      return await dataSources.voteApi.getVotesForComment(parent.article_id, parent.id);
    }
  }
};

export default resolvers;

