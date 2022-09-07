import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from '@blogger/util-logger';
import UserRouter from './app/routers/user-router';
import {createDatabase, createTables} from "./config/database-config";
import Swagger from '@blogger/util-swagger-docs';
import {options} from "./config/swagger";
import ErrorHandler from '@blogger/middleware-api-error';
import registerToRegistry from "./config/register-to-registry";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();
app.use(UserRouter);
app.use(ErrorHandler.apiErrorHandler);
registerToRegistry();
const port: number = parseInt(process.env.PORT_USER_SERVICE) || 3000;
const url = process.env['USER_SERVICE_URL_VISIBLE'];
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
  Swagger.swaggerDocs(app, port, options);
});
server.on('error', console.error);
