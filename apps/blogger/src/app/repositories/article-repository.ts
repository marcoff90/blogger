import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ArticleModel, {ArticleI, State} from "../models/article-model";
import Sequelize from "../../config/sequelize";

const create = async (article: ArticleI) => {
  return await ArticleModel.create(article);
};

const findAllByUserId = async (userId: number) => {
  return await ArticleModel.findAll({
    where: {
      user_id: userId,
      deleted: false
    },
    attributes: {
      exclude: ['deleted']
    },
    order: [
      ['created_at', 'DESC']
    ],
    raw: true
  });
};

const updateByIdAndUserId = async (articleId: number, userId: number, articlesData: ArticleI) => {
  return await ArticleModel.update({
    title: articlesData.title,
    perex: articlesData.perex,
    content: articlesData.content,
    image: articlesData.image,
    state: articlesData.state
  }, {
    where: {
      id: articleId,
      user_id: userId,
      deleted: false
    },
    returning: true
  });
};

const findOneByIdAndUser = async (articleId: number, userId: number) => {
  return await ArticleModel.findOne({
    where: {
      id: articleId,
      user_id: userId,
      deleted: false
    }
  });
};

const softDelete = async (articleId: number, userId: number) => {
  return await ArticleModel.update({
    deleted: true
  }, {
    where: {
      id: articleId,
      user_id: userId
    },
    returning: true
  });
};

const findFiveFeaturedArticles = async () => {
  return await ArticleModel.findAll({
    where: {
      deleted: false,
      state: State.DONE
    },
    order: [Sequelize.random()],
    limit: 5
  })
};

const findArticleIds = async () => {
  return ArticleModel.findAll({
    where: {
      deleted: false,
      state: State.DONE
    },
    attributes: ['id'],
    raw: true
  })
  .then(articles => articles.map(article => article.id));
};

const findAllByUserIdPublic = async (userId: number) => {
  return await ArticleModel.findAll({
    where: {
      user_id: userId,
      deleted: false,
      state: State.DONE
    },
    attributes: {
      exclude: ['deleted']
    },
    order: [
      ['created_at', 'DESC']
    ],
    raw: true
  });
};

const deleteArticle = async (articleId: number) => {
  await ArticleModel.destroy({
    where: {
      id: articleId
    }
  });
};

export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
  softDelete,
  findOneByIdAndUser,
  findFiveFeaturedArticles,
  findArticleIds,
  findAllByUserIdPublic,
  deleteArticle
};
