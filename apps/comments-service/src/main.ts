import express from "express";
import cors from "cors";
import 'dotenv/config';
import ErrorHandler from "@blogger/middleware-api-error";
import logger from '@blogger/util-logger';
import registerToRegistry from "./config/register-to-registry";
import {generateSwaggerDocs} from "./config/swagger";
import {createDatabase} from "./config/database-config";
import syncTables from "./config/sync-tables";
import CommentRouter from "./app/routers/comment-router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
syncTables();

app.use(CommentRouter);
app.use(ErrorHandler.apiErrorHandler);
registerToRegistry();

const port: number = parseInt(process.env.PORT_COMMENTS) || 6666;
const url = process.env['COMMENTS_SERVICE_URL_VISIBLE'];
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
});
server.on('error', console.error);
