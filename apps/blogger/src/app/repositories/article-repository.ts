import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ArticleModel, {ArticleI} from "../models/article-model";

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

export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
};
