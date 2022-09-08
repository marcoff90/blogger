import express from "express";
import cors from "cors";
import 'dotenv/config';
import ErrorHandler from "@blogger/middleware-api-error";
import {createDatabase, createTables} from "./config/database-config";
import registerToRegistry from "./config/register-to-registry";
import logger from '@blogger/util-logger';
import {generateSwaggerDocs} from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();

/**
 *  - api/
 *      - featured - randomly chosen articles with the names of authors
 *  - /api-name/username
 *      - all by user
 *        - title, perex
 *      - pagination?
 *  - /api/username/id
 *      - title, content  of one article
 * - post
 *    - api/username
 *        - add new article
 * - put
 *    - api/username/id
 *        - update article
 * -  delete
 *    - api/username/id
 *       - delete article
 *
 * on post publish to queue, consumer saves to db
 * needed communication with user service to get user data about visible articles
 */
app.use(ErrorHandler.apiErrorHandler);
registerToRegistry();

const port: number = parseInt(process.env.PORT_BLOGGER) || 5555;
const url = process.env['BLOGGER_SERVICE_URL_VISIBLE'];
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}/api`);
  generateSwaggerDocs(app, port);
});
server.on('error', console.error);
