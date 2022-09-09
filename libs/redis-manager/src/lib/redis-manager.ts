import {createClient} from "redis";
import logger from "@blogger/util-logger";
import 'dotenv/config';

const redisUrl = process.env['REDIS_URL'];
const redisPort = process.env['REDIS_PORT'];
const redisPassword = process.env['REDIS_PASSWORD'];

const client = createClient({
  url: `redis://@${redisUrl}:${redisPort}`,
  password: redisPassword
});

client.on('error', (err) => {
  logger.error(err.message);
});

client.on('connect', () => {
  logger.info('Redis connected');
});

const storeToCache = async (key: string, time: number, value: string) => {
  logger.info(`Caching data for ${key}, for time ${time}, value ${value}`);
  if (!client.isOpen) {
    await client.connect();
  }
  try {
    await client.setEx(key, time, value);
    logger.info('Caching successful');
  } catch (e: any) {
    logger.error(`Caching failed: ${e.message}`);
  }
};

const deleteKey = async (key: string) => {
  logger.info(`Deleting key ${key} from cache`);
  if (!client.isOpen) {
    await client.connect();
  }
  try {
    await client.del(key);
    logger.info('Delete successful');
  } catch (e: any) {
    logger.error(`Delete failed: ${e.message}`);
  }
};

const getData = async (key: string) => {
  logger.info(`Trying to load data from cache for key ${key}`);
  if (!client.isOpen) {
    await client.connect();
  }
  try {
    const data = await client.get(key);
    logger.info('Data loaded successfully');
    return data;
  } catch (e: any) {
    logger.error(`Loading failed: ${e.message}`);
    return null;
  }
};

export default {
  storeToCache,
  deleteKey,
  getData
};
