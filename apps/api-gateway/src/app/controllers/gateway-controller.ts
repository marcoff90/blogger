import {Interfaces} from "@blogger/global-interfaces";
import {NextFunction, Request, Response} from "express";
import loadApisData from "../../config/apis-data";
import axios, { AxiosRequestConfig } from "axios";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import GatewayService from "../services/gateway-service";

const forwardRequest = async (req: Request, res: Response, next: NextFunction) => {
  const requestApiName = req.params.apiName;
  const path = req.params.path;

  if (requestApiName === 'docs' || requestApiName === 'docs.json') {
    next();
  } else {
    const servers: Interfaces.ServerI[] = await loadApisData();
    const server: Interfaces.ServerI = servers.find(server => server.name === requestApiName);

    if (server) {
      logger.info(`Forwarding request to ${server.url}`);
      const config: AxiosRequestConfig = GatewayService.getAxiosConfig(req, server, requestApiName, path);

      axios(config)
      .then(response => {
        logger.info(`Received answer: ${JSON.stringify(response.data)}`);
        res.send(response.data);
      })
      .catch(err => {
        logger.error(`${requestApiName}: ${err.message}`);
        res.status(err.response.status).send(err.response.data)
      });

    } else {
      logger.error(`API not found: ${requestApiName}`);
      next(ApiError.notFound({error: `API ${requestApiName} not found`}));
    }
  }
};

export default {
  forwardRequest
};
