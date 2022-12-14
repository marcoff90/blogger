import express, {Express} from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from '@blogger/util-logger';
import generateSwaggerDocs from "./config/swagger";
import ErrorHandler from "@blogger/middleware-api-error";
import GatewayRouter from "./app/routers/gateway-router";

export const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port: number = parseInt(process.env.PORT_GATEWAY) || 3333;
const url = process.env['GATEWAY_URL'];
app.use(GatewayRouter);
app.use(ErrorHandler.apiErrorHandler);
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
});
server.on('error', console.error);
