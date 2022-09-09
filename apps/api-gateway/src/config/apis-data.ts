import logger from "@blogger/util-logger";
import axios, {AxiosResponse} from "axios";
import {Interfaces} from '@blogger/global-interfaces';
import RedisManager from "@blogger/redis-manager";

const loadApisData = async () => {
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
    await RedisManager.deleteKey(redisKey);
    await RedisManager.storeToCache(redisKey, 86400, JSON.stringify(serversData));
    logger.info(`Successfully loaded data: ${JSON.stringify(serversData)}`);
    return serversData;
  } catch (e: any) {
    logger.error(`Can't load api data ${e.message}`);
    return null;
  }
};

export default loadApisData;
