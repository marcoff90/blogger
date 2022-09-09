import {ArticleI} from "../models/article-model";
import ArticleRepository from "../repositories/article-repository";
import {JwtPayload} from "jsonwebtoken";
import logger from '@blogger/util-logger';

const create = async (article: ArticleI, user: string | JwtPayload) => {
  article.user_id = user['id'];
  logger.info(`Created new article ${article.title} by user ${user['username']}`);
  return await ArticleRepository.create(article);
};

export default {
  create
};
