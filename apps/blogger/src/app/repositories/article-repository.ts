import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ArticleModel, {ArticleI, State} from "../models/article-model";
import Sequelize from "../../config/sequelize";
import {SequelizeMethod} from "sequelize/types/utils";
import sequelize from "../../config/sequelize";

const create = async (article: ArticleI): Promise<ArticleI> => {
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

const updateByIdAndUserId = async (articleId: number, userId: number, articlesData: ArticleI): Promise<SequelizeMethod> => {
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

const findOneByIdAndUser = async (articleId: number, userId: number): Promise<ArticleI> => {
  return await ArticleModel.findOne({
    where: {
      id: articleId,
      user_id: userId,
      deleted: false
    }
  });
};

const findOneByIdAndUserIdPublic = async (articleId: number, userId: number): Promise<ArticleI> => {
  return await ArticleModel.findOne({
    where: {
      id: articleId,
      user_id: userId,
      deleted: false,
      state: State.DONE
    }
  });
};

const softDelete = async (articleId: number, userId: number): Promise<SequelizeMethod> => {
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

const findFiveFeaturedArticles = async (): Promise<ArticleI[]> => {
  return await ArticleModel.findAll({
    where: {
      deleted: false,
      state: State.DONE
    },
    order: [Sequelize.random()],
    limit: 5,
  })
};

const findArticleIds = async (): Promise<number[]> => {
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

const findAllByUserIdPublic = async (userId: number): Promise<ArticleI[]> => {
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

const deleteArticle = async (articleId: number): Promise<void> => {
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
  deleteArticle,
  findOneByIdAndUserIdPublic
};
