import RedisManager from "@blogger/redis-manager";
import logger from "@blogger/util-logger";
import 'dotenv/config';
import axios, {AxiosResponse} from "axios";

/**
 * article ids are cached upon adding/deleting article in blogger service for 24 hours or when cache is empty
 * directly in comments service -> this way the comments adding/loading is faster and comments service has current
 * info at all times, or in case of fail of blogger service, the comments service has data in cache at least for
 * some times
 */

const redisKey = process.env['REDIS_EXISTING_ARTICLES'];

const doesArticleExist = async (articleId: number) : Promise<boolean>=> {
  let cachedData = null;
  let ids: number[];

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded featured articles from cache: ${cachedData}`);
    ids = JSON.parse(cachedData);
    if (ids.length <= 0) {
      ids = await loadArticleIds();
    }
  } else {
    ids = await loadArticleIds();
  }
  return ids.includes(articleId);
};

const loadArticleIds = async (): Promise<number[]> => {
  const bloggerServiceUrl = process.env['BLOGGER_SERVICE_URL'];
  const bloggerServicePort = process.env['PORT_BLOGGER'];
  const apiKey = process.env['BLOGGER_APIKEY'];

  logger.info(`Loading article ids from api`);

  try {
    const res: AxiosResponse = await axios.get(`${bloggerServiceUrl}:${bloggerServicePort}/blogger-service-api/internal/articles`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const ids: number[] = res.data;

    try {
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(ids));
    } catch (e: any) {
      logger.error(`Data not cached: ${e.message}`);
    }
    logger.info(`Successfully loaded data: ${JSON.stringify(ids)}`);
    return ids;
  } catch (e: any) {
    logger.error(`Can't load articles data: ${e.message}`);
    return null;
  }
};

export default {
  doesArticleExist
};

