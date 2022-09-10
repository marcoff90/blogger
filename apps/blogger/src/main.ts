import express from "express";
import cors from "cors";
import 'dotenv/config';
import ErrorHandler from "@blogger/middleware-api-error";
import {createDatabase, createTables} from "./config/database-config";
import registerToRegistry from "./config/register-to-registry";
import logger from '@blogger/util-logger';
import {generateSwaggerDocs} from "./config/swagger";
import ArticleRouter from "./app/routers/article-router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();

/**
 * - get (no auth)
 *  - api/
 *      - featured - randomly chosen articles with the names of authors
 *  - /api-name/username
 *      - all by user
 *        - title, perex, order by date desc, publication day
 *
 * COMMUNICATION WITH USER SERVICE
 * - needed userId, username, avatar of active users
 * - on load of app blogger sends request to user-service to get these data and stores them in cache for 24 hours
 *    - when sending the data for endpoints, it builds the response with the data
 *    - featured will be just 5 random articles
 *      -> load the articles
 *      -> compare user id of article with user ids withing the cache
 *      -> rebuild the objects to response
 *    - /username
 *      -> find the username and user id, find all articles by userId, set username for every Article
 *    - /userId
 *      -> same as /username but with userId
 * - when new user is activated and has empty blog page
 *
 * on post publish to queue, consumer saves to db
 * needed communication with user service to get user data about visible articles
 */
app.use(ArticleRouter);
app.use(ErrorHandler.apiErrorHandler);
registerToRegistry();

const port: number = parseInt(process.env.PORT_BLOGGER) || 5555;
const url = process.env['BLOGGER_SERVICE_URL_VISIBLE'];
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}/api`);
});
server.on('error', console.error);
