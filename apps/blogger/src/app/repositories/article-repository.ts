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

export default {
  create,
  findAllByUserId
};
