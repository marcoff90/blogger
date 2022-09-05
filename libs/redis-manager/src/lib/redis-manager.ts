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
  await client.connect();
  await client.setEx(key, time, value);
  logger.info('Caching successful');
};

const redisClient = () => {
  return client;
};

export default {
  storeToCache,
  redisClient
};
