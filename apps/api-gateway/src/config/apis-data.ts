import logger from "@blogger/util-logger";
import axios, {AxiosResponse} from "axios";
import {Interfaces} from '@blogger/global-interfaces';
import RedisManager from "@blogger/redis-manager";

/**
 * Since it's unexpected that the servers' data will change often, we cache the data for 24 hours to allow smoother
 * experienced
 */

const loadApisData = async (): Promise<Interfaces.ServerI[]> => {
  const registryUrl = process.env['REGISTRY_URL'];
  const registryPort = process.env['PORT_REGISTRY'];
  const apiKey = process.env['API_REGISTRY_KEY'];
  const redisKey = process.env['REDIS_API_GATEWAY_KEY'];

  logger.info('Loading servers data from registry');
  try {
    const res: AxiosResponse = await axios.get(`${registryUrl}:${registryPort}/api-registry/servers`, {
      headers: {
        'x-api-key': apiKey
      }
    });
    const serversData: Interfaces.ServerI[] = res.data;

    try {
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(serversData));
    } catch (e: any) {
     logger.error(`Data not cached: ${e.message}`);
    }

    logger.info(`Successfully loaded data: ${JSON.stringify(serversData)}`);
    return serversData;
  } catch (e: any) {
    logger.error(`Can't load api data ${e.message}`);
    return null;
  }
};

export default loadApisData;
