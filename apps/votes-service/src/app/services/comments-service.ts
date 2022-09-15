import RedisManager from "@blogger/redis-manager";
import logger from "@blogger/util-logger";
import 'dotenv/config';
import axios, {AxiosResponse} from "axios";

/**
 * comments ids are cached upon adding/deleting comment in comments service for 24 hours or when cache is empty
 * directly in vote service -> this way the vote adding/loading is faster and vote service has current
 * info at all times, or in case of fail of comments service, the vote service has data in cache at least for
 * some times
 */

const redisKey = process.env['REDIS_EXISTING_COMMENTS'];

const doesCommentExist = async (commentId: number) : Promise<boolean>=> {
  let cachedData = null;
  let ids: number[];

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded comments ids from cache: ${cachedData}`);
    ids = JSON.parse(cachedData);
    if (ids.length <= 0) {
      ids = await loadCommentIds();
    }
  } else {
    ids = await loadCommentIds();
  }
  return ids.includes(commentId);
};

const loadCommentIds = async (): Promise<number[]> => {
  const commentsServiceUrl = process.env['COMMENTS_SERVICE_URL'];
  const commentsPort = process.env['PORT_COMMENTS'];
  const apiKey = process.env['COMMENTS_APIKEY'];

  logger.info(`Loading comments ids from api`);

  try {
    const res: AxiosResponse = await axios.get(`${commentsServiceUrl}:${commentsPort}/comments-service-api/internal/comments`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const ids: number[] = res.data;

    try {
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(ids));
    } catch (e: any) {
      logger.error(`Comment ids not cached: ${e.message}`);
    }
    logger.info(`Successfully loaded comment ids: ${JSON.stringify(ids)}`);
    return ids;
  } catch (e: any) {
    logger.error(`Can't load comments ids: ${e.message}`);
    return null;
  }
};

export default {
  doesCommentExist
};

