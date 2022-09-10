import { Interfaces } from "@blogger/global-interfaces";
import logger from '@blogger/util-logger';
import axios, {AxiosResponse} from "axios";
import RedisManager from "../../../../../libs/redis-manager/src/lib/redis-manager";
import 'dotenv/config';

/**
 * The user data is stored in user service
 * we need to display some user data. Blogger receives the data from UserServiceApi of active users,
 * stores them in a cache
 * if the user data is found in the cache, there's no need to call to api to get fresh data
 * whenever the data isn't found in cache, or 24 hours have passed
 * we refresh the data and look for the user data in the data loaded from api
 * if we didn't find the data, the user doesn't exist and we return 404
 */

const redisKey = process.env['REDIS_BLOGGER_KEY'];

const findUserDataById = async (userId: number) => {
  let cachedData: string = null;

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e: any) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded user data from cache: ${cachedData}`);
    const data: Interfaces.UserData[] = JSON.parse(cachedData);
    const user = data.find(user => user.id === userId);
    if (user) {
      logger.info(`Found user in cache: id: ${userId}`)
      return user;
    }
  }
  return await findByUserIdFromApi(userId);
};

const findUserDataByUsername = async (username: string) => {
  let cachedData: string = null;

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e: any) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded user data from cache: ${cachedData}`);
    const data: Interfaces.UserData[] = JSON.parse(cachedData);
    const user = data.find(user => user.username === username);
    if (user) {
      logger.info(`Found user in cache: id: ${username}`)
      return user;
    }
  }
  return await findByUsernameFromApi(username);
}

const findByUserIdFromApi = async (userId: number) => {
  const data: Interfaces.UserData[] = await loadUsersData();
  const user = data.find(user => user.id === userId);
  if (user) {
    logger.info(`Found user in api data: id: ${userId}`);
    return user;
  }
  logger.error('No user found in api data neither in cache');
  return null;
};

const findByUsernameFromApi = async (username: string) => {
  const data: Interfaces.UserData[] = await loadUsersData();
  const user = data.find(user => user.username === username);
  if (user) {
    logger.info(`Found user in api data: id: ${username}`);
    return user;
  }
  logger.error('No user found in api data neither in cache');
  return null;
}

const loadUsersData = async () => {
  const userServiceUrl = process.env['USER_SERVICE_URL'];
  const userServicePort = process.env['PORT_USER_SERVICE'];
  const apiKey = process.env['USER_SERVICE_API_KEY'];

  logger.info(`Loading users data for articles`);

  try {
    const res: AxiosResponse = await axios.get(`${userServiceUrl}:${userServicePort}/user-service-api/internal/users`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const userData: Interfaces.UserData[] = res.data;

    try {
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(userData));
    } catch (e: any) {
      logger.error(`Data not cached: ${e.message}`);
    }
    logger.info(`Successfully loaded data: ${JSON.stringify(userData)}`);
    return userData;
  } catch (e: any) {
    logger.error(`Can't load user data: ${e.message}`);
    return null;
  }
};

export default {
  findUserDataById,
  findUserDataByUsername
};
