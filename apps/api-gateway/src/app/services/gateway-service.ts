import {Interfaces} from "@blogger/global-interfaces";
import {Request} from "express";
import {AxiosRequestConfig} from "axios";
import RedisManager from "@blogger/redis-manager";
import loadApisData from "../../config/apis-data";
import logger from '@blogger/util-logger';

const getAxiosConfig = (req: Request, server: Interfaces.ServerI, path: string, reqParams: any) => {
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

const getApiData = async () => {
  const redisClient = RedisManager.redisClient();

  let apiData = null;

  try {
    apiData = await redisClient.get('apiData');
  } catch (e: any) {
    logger.error(e.message);
  }

  if (apiData) {
    logger.info(`Loaded api data from cache: ${apiData}`);
    return JSON.parse(apiData);
  }

  const servers: Interfaces.ServerI[] = await loadApisData();
  logger.info(`Loaded api data from api registry: ${JSON.stringify(servers)}`);
  return servers;
};

export default {
  getAxiosConfig,
  getApiData
};
