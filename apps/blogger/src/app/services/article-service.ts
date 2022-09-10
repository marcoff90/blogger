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

  logger.info(`Sending articles: ${result.length}`);
  return result;
};

const updateByIdAndUserId = async (user: string | JwtPayload, articleId: number, articlesData: ArticleI) => {
  const updatedData = await ArticleRepository.updateByIdAndUserId(articleId, user['id'], articlesData);
  // sequelize returns the model with metadata -> the array has count of updated objects in 0 index, and array of
  // models at 1 index, the data is in property dataValues
  const {deleted, user_id, ...response} = updatedData[1][0]['dataValues'];
  logger.info(`Successfully updated article ${JSON.stringify(response)}`);
  return response;
};

const doesArticleExist = async (user: string | JwtPayload, articleId: number) => {
  const article = await ArticleRepository.findOneByIdAndUser(articleId, user['id']);
  return article != null;
};

const softDelete = async (user: string | JwtPayload, articleId: number) => {
  logger.info(`Deleting article ${articleId}`);
  const updatedData = await ArticleRepository.softDelete(articleId, user['id']);
  if (updatedData[1][0]['dataValues']['deleted']) {
    logger.info(`Successfully deleted!`);
    return true;
  } else {
    logger.error(`Delete failed`);
    return false;
  }
};

export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
  softDelete,
  doesArticleExist
};
