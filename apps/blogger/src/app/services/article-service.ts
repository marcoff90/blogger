import {ArticleI} from "../models/article-model";
import ArticleRepository from "../repositories/article-repository";
import {JwtPayload} from "jsonwebtoken";
import logger from '@blogger/util-logger';
import {GetUserArticleResponse} from "../interfaces/get-user-article-response";
import UserService from "./user-service";
import {Interfaces} from '@blogger/global-interfaces';
import 'dotenv/config';
import RedisManager from "@blogger/redis-manager";
import RabbitManager from "@blogger/rabbitmq-manager";
import {UpdateArticleResponse} from "../interfaces/update-article-response";

/**
 * When creating article, update the article ids in redis cache, which are used in comments service, to check if
 * article exists
 */

const create = async (article: ArticleI, user: string | JwtPayload): Promise<ArticleI> => {
  article.user_id = user['id'];
  logger.info(`Created new article ${article.title} by user ${user['username']}`);
  const savedArticle = await ArticleRepository.create(article);
  await updateArticleIdsInCache(savedArticle.id);
  return savedArticle;
};

const findAllByUserId = async (user: string | JwtPayload | Interfaces.UserData): Promise<GetUserArticleResponse[]> => {
  const articles: ArticleI[] = await ArticleRepository.findAllByUserId(user['id']);
  logger.info(`Successfully loaded ${articles.length} articles of ${user['username']}`);
  return convertAllArticleToResponse(articles, user['username'])
};

const updateByIdAndUserId = async (user: string | JwtPayload, articleId: number, articlesData: ArticleI): Promise<UpdateArticleResponse> => {
  const updatedData = await ArticleRepository.updateByIdAndUserId(articleId, user['id'], articlesData);
  // sequelize returns the model with metadata -> the array has count of updated objects in 0 index, and array of
  // models at 1 index, the data is in property dataValues
  const {deleted, user_id, ...response} = updatedData[1][0]['dataValues'];
  logger.info(`Successfully updated article ${JSON.stringify(response)}`);
  return response;
};

/**
 * Checks if article, passed as path variable exists when updating/deleting article
 */
const doesArticleExist = async (user: string | JwtPayload, articleId: number): Promise<boolean> => {
  const article = await ArticleRepository.findOneByIdAndUser(articleId, user['id']);
  return article != null;
};

/**
 * Delete id from ids cache -> comments service needs updated data
 * Send rabbit message to comment service to delete comments accordingly
 * Soft delete -> after article soft deleted, comments will delete through message, comments send message back that
 * article deleted -> we can hard delete
 */

const softDelete = async (user: string | JwtPayload, articleId: number): Promise<boolean> => {
  logger.info(`Deleting article ${articleId}`);
  const updatedData = await ArticleRepository.softDelete(articleId, user['id']);
  await deleteArticleIdFromCache(articleId);
  await notifyCommentsService(articleId);
  if (updatedData[1][0]['dataValues']['deleted']) {
    logger.info(`Successfully deleted!`);
    return true;
  } else {
    logger.error(`Delete failed`);
    return false;
  }
};

/**
 * shows five randomly chosen articles, for 24 hours fixed in cache, then new random articles
 */

const getFiveFeaturedArticles = async (): Promise<GetUserArticleResponse[]> => {
  const redisKey = process.env['REDIS_BLOGGER_FEATURED'];

  let cachedData: string = null;

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e: any) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded featured articles from cache: ${cachedData}`);
    const articles: GetUserArticleResponse[] = JSON.parse(cachedData);
    return articles;
  }

  const articles: GetUserArticleResponse[] = await findFreshFiveArticles();

  try {
    await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(articles));
  } catch (e: any) {
    logger.error(`Data not cached: ${JSON.stringify(articles)}`);
  }

  return articles;
};

const findFreshFiveArticles = async (): Promise<GetUserArticleResponse[]> => {
  const articles: ArticleI[] = await ArticleRepository.findFiveFeaturedArticles();
  logger.info(`Successfully loaded new featured articles`);

  const result: GetUserArticleResponse[] = [];

  for (const article of articles) {
    const username = await findUsernameByArticleId(articles, article.id);
    const converted = convertArticleToArticleResponse(article, username);
    result.push(converted);
  }

  logger.info(`Successfully added usernames to articles`);
  return result;
};

/**
 * When loading five fresh articles, we get only the data stored in bloggers db, we need to display username of the
 * blogger as well, we send those five articles to create map of articleId, userId and by userId find user data
 * obtained from user service through internal api
 */

const findUsernameByArticleId = async (articles: ArticleI[], articleId: number): Promise<string> => {
  const map = mapArticleAndUserId(articles);
  const userId = map.get(articleId);
  const user: Interfaces.UserData = await UserService.findUserDataById(userId);
  if (user) {
    return user.username;
  } else {
    throw new Error(`Could not find user under id: ${userId} associated with article: id: ${articleId}`);
  }
};

const mapArticleAndUserId = (articles: ArticleI[]): Map<number, number> => {
  const map = new Map();
  articles.map(article => {
    map.set(article.id, article.user_id);
  });
  return map;
};

/**
 * public part of blogger uses username as path variable, so each writer can have his own data shown
 * We find the user id by username from user's data from user api
 * There's a probability the articles of one user won't be changing very often, we cache the articles for 12 hours by
 * username of the blogger
 */

const findArticlesByUsername = async (username: string): Promise<GetUserArticleResponse[]> => {
  const user: Interfaces.UserData = await UserService.findUserDataByUsername(username);
  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  const cachedArticles = await loadUserArticlesFromCache(username);

  if (!cachedArticles) {
    const articles: ArticleI[] = await ArticleRepository.findAllByUserIdPublic(user['id']);
    const converted: GetUserArticleResponse[] = convertAllArticleToResponse(articles, user.username);
    await saveUserArticlesToCache(username, converted);
    return converted;
  }
  return cachedArticles;
};

const loadUserArticlesFromCache = async (username: string): Promise<GetUserArticleResponse[]> => {
  let cachedData: string = null;

  try {
    cachedData = await RedisManager.getData(username);
  } catch (e: any) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded user articles form cache: ${cachedData}`);
    const articles: GetUserArticleResponse[] = JSON.parse(cachedData);
    return articles;
  }
  return null;
};

const saveUserArticlesToCache = async (username: string, articles: GetUserArticleResponse[]): Promise<void> => {
  try {
    await RedisManager.storeToCache(username, 43200, JSON.stringify(articles));
  } catch (e: any) {
    logger.error(`Data not cached: ${JSON.stringify(articles)}`);
  }
};

const convertArticleToArticleResponse = (article: ArticleI, username: string): GetUserArticleResponse => {
  return {
    id: article.id,
    title: article.title,
    perex: article.perex,
    content: article.content,
    state: article.state,
    image: article.image,
    created_at: article.created_at,
    updated_at: article.updated_at,
    username: username,
  };
};

/**
 * Sends ids of articles to comment service, if comments service didn't get them from cache
 */

const findArticleIds = async (): Promise<number[]> => {
  return await ArticleRepository.findArticleIds();
};

const updateArticleIdsInCache = async (articleId: number): Promise<void> => {
  const redisKey = process.env['REDIS_EXISTING_ARTICLES'];

  try {
    const cachedData = await RedisManager.getData(redisKey);
    const ids = JSON.stringify(cachedData);
    if (Array.isArray(ids)) {
      ids.push(articleId);
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 864000, JSON.stringify(ids));
      logger.info(`Article ids in cache updated: ${JSON.stringify(ids)}`);
    }
  } catch (e: any) {
    logger.error(`Article ids not updated: ${e.message}`);
  }
};

const deleteArticleIdFromCache = async (articleId: number): Promise<void> => {
  const redisKey = process.env['REDIS_EXISTING_ARTICLES'];

  try {
    const cachedData = await RedisManager.getData(redisKey);
    const ids = JSON.stringify(cachedData);
    if (Array.isArray(ids)) {
      const index = ids.indexOf(articleId);
      if (index > -1) {
        ids.splice(index, 1);
        await RedisManager.deleteKey(redisKey);
        await RedisManager.storeToCache(redisKey, 864000, JSON.stringify(ids));
        logger.info(`Article ids in cache updated: ${JSON.stringify(ids)}`);
      }
    }
  } catch (e: any) {
    logger.error(`Article ids not updated: ${e.message}`);
  }
};

const convertAllArticleToResponse = (articles: ArticleI[], username: string): GetUserArticleResponse[] => {
  const result: GetUserArticleResponse[] = [];
  articles.map(article => {
    const convert = convertArticleToArticleResponse(article, username);
    result.push(convert);
  });
  logger.info(`Sending articles: ${result.length}`);
  return result;
};


/**
 * On article delete send message to comment's service to delete comments associated with article
 */
const notifyCommentsService = async (articleId: number): Promise<void> => {
  const routingKey = process.env['BLOGGER_ROUTING_KEY'];
  const message: Interfaces.DeletedArticleMessage = {
    deletedId: articleId
  };
  await RabbitManager.publishMessage(routingKey, message);
};

const deleteArticle = async (articleId: number): Promise<void> => {
  try {
    await ArticleRepository.deleteArticle(articleId);
    logger.info(`Article deleted id: ${articleId}`);
  } catch (e: any) {
    logger.error(`Deleting article id: ${articleId} failed: ${e.message}`)
  }
};

export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
  softDelete,
  doesArticleExist,
  getFiveFeaturedArticles,
  findArticlesByUsername,
  findArticleIds,
  deleteArticle
};
