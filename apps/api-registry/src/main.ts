import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from '@blogger/util-logger';
import {createDatabase, createTables} from "./config/database-config";
import Swagger from '@blogger/util-swagger-docs';
import {options} from "./config/swagger";
import ServerRouter from './app/routers/server-router';
import ErrorHandler from "@blogger/middleware-api-error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();
app.use(ServerRouter);
app.use(ErrorHandler.apiErrorHandler);

const port: number = parseInt(process.env.PORT_REGISTRY) || 4444;
const url = process.env['REGISTRY_URL_VISIBLE'];
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
  Swagger.swaggerDocs(app, port, options);
});
server.on('error', console.error);
