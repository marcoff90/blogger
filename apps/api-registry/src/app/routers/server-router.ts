import {Router} from "express";
import ServerController from "../controllers/server-controller";
import Validator from '@blogger/middleware-validator';
import {createServerSchema} from "../schemas/server-schema";

const ServerRouter = Router();

ServerRouter.post('/api-registry/servers', Validator.validate(createServerSchema), ServerController.storeServer);

ServerRouter.get('/api-registry/servers', ServerController.showAll);

export default ServerRouter;
