import {ArticleI} from "../models/article-model";
import ArticleRepository from "../repositories/article-repository";
import {JwtPayload} from "jsonwebtoken";
import logger from '@blogger/util-logger';
import {GetUserArticleResponse} from "../interfaces/get-user-article-response";
import UserService from "./user-service";
import {Interfaces} from '@blogger/global-interfaces';
import 'dotenv/config';
import RedisManager from "../../../../../libs/redis-manager/src/lib/redis-manager";

const create = async (article: ArticleI, user: string | JwtPayload) => {
  article.user_id = user['id'];
  logger.info(`Created new article ${article.title} by user ${user['username']}`);
  const savedArticle = await ArticleRepository.create(article);

  const cachedArticles = await loadUserArticlesFromCache(user['username']);

  if (cachedArticles) {
    const converted = convertArticleToArticleResponse(savedArticle, user['username']);
    cachedArticles.push(converted);
    try {
      await RedisManager.deleteKey(user['username']);
      await saveUserArticlesToCache(user['username'], cachedArticles);
    } catch (e: any) {
      logger.error(e.message);
    }
  }

  return savedArticle;
};

const findAllByUserId = async (user: string | JwtPayload | Interfaces.UserData) => {
  const cachedArticles = await loadUserArticlesFromCache(user['username']);

  if (cachedArticles) {
    return cachedArticles;
  }

  const articles: ArticleI[] = await ArticleRepository.findAllByUserId(user['id']);
  logger.info(`Successfully loaded ${articles.length} articles of ${user['username']}`);

  const result: GetUserArticleResponse[] = [];

  articles.map(article => {
    const convert = convertArticleToArticleResponse(article, user['username']);
    result.push(convert);
  });

  await saveUserArticlesToCache(user['username'], result);
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

const getFiveFeaturedArticles = async () => {
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

const findFreshFiveArticles = async () => {
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

const findUsernameByArticleId = async (articles: ArticleI[], articleId: number) => {
  const map = mapArticleAndUserId(articles);
  const userId = map.get(articleId);
  const user: Interfaces.UserData = await UserService.findUserDataById(userId);
  if (user) {
    return user.username;
  } else {
    throw new Error(`Could not find user under id: ${userId} associated with article: id: ${articleId}`);
  }
};

const mapArticleAndUserId = (articles: ArticleI[]) => {
  const map = new Map();
  articles.map(article => {
    map.set(article.id, article.user_id);
  });
  return map;
};

const findArticlesByUsername = async (username: string) => {
  const user: Interfaces.UserData = await UserService.findUserDataByUsername(username);
  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  const cachedArticles = await loadUserArticlesFromCache(username);

  if (!cachedArticles) {
    return await findAllByUserId(user);
  }
  return cachedArticles;
};

const loadUserArticlesFromCache = async (username: string) => {
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

const saveUserArticlesToCache = async (username: string, articles: GetUserArticleResponse[]) => {
  try {
    await RedisManager.storeToCache(username, 43200, JSON.stringify(articles));
  } catch (e: any) {
    logger.error(`Data not cached: ${JSON.stringify(articles)}`);
  }
};

const convertArticleToArticleResponse = (article: ArticleI, username: string) => {
  return {
    id: article.id,
    title: article.title,
    perex: article.perex,
    content: article.content,
    state: article.state,
    image: article.image,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    username: username,
  };
};


export default {
  create,
  findAllByUserId,
  updateByIdAndUserId,
  softDelete,
  doesArticleExist,
  getFiveFeaturedArticles,
  findArticlesByUsername
};
