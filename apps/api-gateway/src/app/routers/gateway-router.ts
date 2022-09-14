import {Router} from "express";
import GatewayController from "../controllers/gateway-controller";
import MessageConsumer from "../middlewares/message-consumer";

const GatewayRouter: Router = Router();

GatewayRouter.all('/:apiName/*', MessageConsumer.consumeMessages, GatewayController.forwardRequest);

export default GatewayRouter;
