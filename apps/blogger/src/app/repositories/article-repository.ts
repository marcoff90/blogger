import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ArticleModel, {ArticleI} from "../models/article-model";

const create = async (article: ArticleI) => {
  return await ArticleModel.create(article);
};

export default {
  create,
};
