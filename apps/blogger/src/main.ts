import express, {Express} from "express";
import cors from "cors";
import 'dotenv/config';
import ErrorHandler from "@blogger/middleware-api-error";
import {createDatabase, createTables} from "./config/database-config";
import registerToRegistry from "./config/register-to-registry";
import logger from '@blogger/util-logger';
import {generateSwaggerDocs} from "./config/swagger";
import ArticleRouter from "./app/routers/article-router";
import InternalRouter from "./app/routers/internal-router";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();

app.use(ArticleRouter);
app.use(InternalRouter);
app.use(ErrorHandler.apiErrorHandler);
registerToRegistry();

const port: number = parseInt(process.env.PORT_BLOGGER) || 5555;
const url = process.env['BLOGGER_SERVICE_URL_VISIBLE'];
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
});
server.on('error', console.error);
