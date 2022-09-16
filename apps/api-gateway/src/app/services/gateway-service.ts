import {Interfaces} from "@blogger/global-interfaces";
import {Request} from "express";
import {AxiosRequestConfig} from "axios";
import RedisManager from "@blogger/redis-manager";
import loadApisData from "../../config/apis-data";
import logger from '@blogger/util-logger';
import 'dotenv/config';

/**
 * Since not every endpoint is protected by auth, we need two types of headers
 */

const getAxiosConfig = (req: Request, server: Interfaces.ServerI, path: string, reqParams: any): AxiosRequestConfig => {
  const config: AxiosRequestConfig = !req.headers.authorization ?
    {
      method: req.method,
      url: `${server.url}${path}`, // no slash between url and path to api because zod accepts url with the slash at the end
      data: req.body,
      params: reqParams
    } :
    {
      method: req.method,
      url: `${server.url}${path}`,
      data: req.body,
      params: reqParams,
      headers: {
        'Authorization': req.headers.authorization
      }
    };
  return config;
};

const getApiData = async (): Promise<Interfaces.ServerI[]> => {
  const redisKey = process.env['REDIS_API_GATEWAY_KEY'];

  let cachedData: string = null;

  try {
    cachedData = await RedisManager.getData(redisKey);
  } catch (e: any) {
    logger.error(e.message);
  }

  if (cachedData) {
    logger.info(`Loaded api data from cache: ${cachedData}`);
    return JSON.parse(cachedData);
  }

  const servers: Interfaces.ServerI[] = await loadApisData();
  logger.info(`Loaded api data from api registry: ${JSON.stringify(servers)}`);
  return servers;
};

export default {
  getAxiosConfig,
  getApiData
};
