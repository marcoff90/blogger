import {Router} from "express";
import GatewayController from "../controllers/gateway-controller";

const GatewayRouter = Router();

GatewayRouter.all('/:apiName/:path', GatewayController.forwardRequest);

export default GatewayRouter;
