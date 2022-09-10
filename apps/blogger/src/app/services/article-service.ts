import {ArticleI} from "../models/article-model";
import ArticleRepository from "../repositories/article-repository";
import {JwtPayload} from "jsonwebtoken";
import logger from '@blogger/util-logger';
import {GetUserArticleResponse} from "../interfaces/get-user-article-response";

const create = async (article: ArticleI, user: string | JwtPayload) => {
  article.user_id = user['id'];
  logger.info(`Created new article ${article.title} by user ${user['username']}`);
  return await ArticleRepository.create(article);
};

const findAllByUserId = async (user: string | JwtPayload) => {
  const articles: ArticleI[] = await ArticleRepository.findAllByUserId(user['id']);
  logger.info(`Successfully loaded ${articles.length} articles of ${user['username']}`);

  const result: GetUserArticleResponse[] = [];
  Object.assign(result, articles);

  result.map(article => {
    article.username = user['username']
  });

  logger.info(`Created article response: ${result.length} results`);
  return result;
};

export default {
  create,
  findAllByUserId
};
