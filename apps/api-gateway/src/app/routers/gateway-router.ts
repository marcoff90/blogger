import {Router} from "express";
import GatewayController from "../controllers/gateway-controller";
import MessageConsumer from "../middlewares/message-consumer";

const GatewayRouter = Router();

GatewayRouter.all('/:apiName/:path', MessageConsumer.consumeMessages, GatewayController.forwardRequest);

export default GatewayRouter;
