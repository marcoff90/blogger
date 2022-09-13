import {Interfaces} from "@blogger/global-interfaces";
import {NextFunction, Request, Response} from "express";
import axios, {AxiosRequestConfig} from "axios";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import GatewayService from "../services/gateway-service";

/**
 * the api name is obtained by path variable and used to filter in data from api registry to get url of the service,
 * then the path is used to connect to api
 */

const forwardRequest = async (req: Request, res: Response, next: NextFunction) => {
  const {apiName} = req.params;
  const path = req.path.substring(1);
  const params = req.query;

  if (apiName === 'docs' || apiName === 'docs.json') {
    next();
  } else {

    const servers: Interfaces.ServerI[] = await GatewayService.getApiData();
    const server: Interfaces.ServerI = servers.find(server => server.name === apiName);
    if (server) {
      logger.info(`Forwarding request to ${server.url}`);
      const config: AxiosRequestConfig = GatewayService.getAxiosConfig(req, server, path, params);

      axios(config)
      .then(response => {
        logger.info(`Received answer: ${JSON.stringify(response.data)}`);
        res.send(response.data);
      })
      .catch(err => {
        logger.error(`${apiName}: ${err.message}`);
        if (err.code === 'ECONNREFUSED') {
          next(ApiError.unavailable({error: `${server.name} unavailable`}));
        } else {
          res.status(err.response.status).send(err.response.data);
        }
      });

    } else {
      logger.error(`API not found: ${apiName}`);
      next(ApiError.notFound({error: `API ${apiName} not found`}));
    }
  }
};

export default {
  forwardRequest
};
