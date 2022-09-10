import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ArticleModel, {ArticleI} from "../models/article-model";
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
      ['createdAt', 'DESC']
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
    order: [Sequelize.random()],
    limit: 5
  })
};

export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
  softDelete,
  findOneByIdAndUser,
  findFiveFeaturedArticles
};
