import { Interfaces } from "@blogger/global-interfaces";
import {Request} from "express";
import {AxiosRequestConfig} from "axios";
import RedisManager from "@blogger/redis-manager";
import loadApisData from "../../config/apis-data";
import logger from '@blogger/util-logger';

const getAxiosConfig = (req: Request, server: Interfaces.ServerI, requestApiName: string, path: string) => {
  const config: AxiosRequestConfig = !req.headers.authorization ?
    {
      method: req.method,
      url: `${server.url}/${requestApiName}/${path}`,
      data: req.body
    } :
    {
      method: req.method,
      url: `${server.url}/${requestApiName}/${path}`,
      data: req.body,
      headers: {
        'Authorization': req.headers.authorization
      }
    };
  return config;
};

const getApiData = async () => {
  const redisClient = RedisManager.redisClient();

  try {
    const apiData = await redisClient.get('apiData');
    if (apiData) {
      logger.info(`Loaded api data from cache: ${apiData}`);
      return JSON.parse(apiData);
    } else {
      const servers: Interfaces.ServerI[] = await loadApisData();
      logger.info(`Loaded api data from api registry: ${JSON.stringify(servers)}`);
      return servers;
    }
  } catch (e: any) {
    logger.error(e.message);
    return null;
  }
};

export default {
  getAxiosConfig,
  getApiData
};
