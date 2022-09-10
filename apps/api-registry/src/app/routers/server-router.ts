import {Router} from "express";
import ServerController from "../controllers/server-controller";
import Validator from '@blogger/middleware-validator';
import {createServerSchema} from "../schemas/create-server-schema";
import MessageConsumer from '../middlewares/message-consumer';
import {createGetServesSchema} from "../schemas/get-servers-schema";

const ServerRouter = Router();

ServerRouter.post('/api-registry/servers', Validator.validate(createServerSchema),
  MessageConsumer.consumeMessages, ServerController.storeServer);

ServerRouter.get('/api-registry/servers', Validator.validate(createGetServesSchema),
  MessageConsumer.consumeMessages, ServerController.showAll);

export default ServerRouter;
