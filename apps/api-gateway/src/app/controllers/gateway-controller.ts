import {Interfaces} from "@blogger/global-interfaces";
import {NextFunction, Request, Response} from "express";
import axios, {AxiosRequestConfig} from "axios";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import GatewayService from "../services/gateway-service";

const forwardRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { apiName } = req.params;
  // the api name is used to filter the api data from cache/api registry to get corresponding
  // server to contact -> then we use the whole path in request to connect to api
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
        res.status(err.response.status).send(err.response.data)
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
