import ServerService from "../services/server-service";
import {NextFunction, Request, Response} from "express";
import {CreateServerInput} from "../schemas/create-server-schema";
import logger from '@blogger/util-logger';
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {Interfaces} from '@blogger/global-interfaces';
import 'dotenv/config';
import {GetServers} from "../schemas/get-servers-schema";

const storeServer = async (req: Request<CreateServerInput['body'], CreateServerInput['headers']>,
                           res: Response,
                           next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env['API_REGISTRY_KEY']) {
    try {
      const savedServer: Interfaces.ServerI = await ServerService.create(req.body);
      res.send(savedServer);
    } catch (e: any) {
      logger.error(e.message);
      next(ApiError.conflict({error: e.message}));
    }
  } else {
    logger.error(`Blocked access due to invalid api key`);
    next(ApiError.unauthorized({error: `Access denied`}));
  }
};

const showAll = async (req: Request<GetServers['headers']>, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey === process.env['API_REGISTRY_KEY']) {
    const servers: Interfaces.ServerI[] = await ServerService.findAll();
    if (servers.length > 0) {
      res.send(servers);
    } else {
      logger.info(`No servers found`);
      next(ApiError.notFound({error: 'No servers available'}));
    }
  } else {
    logger.error(`Blocked access due to invalid api key`);
    next(ApiError.unauthorized({error: `Access denied`}));
  }
};

export default {
  storeServer,
  showAll
};
