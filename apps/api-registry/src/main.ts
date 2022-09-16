import express, {Express} from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from '@blogger/util-logger';
import {createDatabase, createTables} from "./config/database-config";
import ServerRouter from './app/routers/server-router';
import ErrorHandler from "@blogger/middleware-api-error";
import {generateSwaggerDocs} from "./config/swagger";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();
app.use(ServerRouter);
app.use(ErrorHandler.apiErrorHandler);

const port: number = parseInt(process.env.PORT_REGISTRY) || 4444;
const url = process.env['REGISTRY_URL_VISIBLE'];
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
});
server.on('error', console.error);
