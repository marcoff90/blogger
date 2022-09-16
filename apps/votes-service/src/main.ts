import express, {Express} from 'express';
import cors from "cors";
import ErrorHandler from "@blogger/middleware-api-error";
import logger from "@blogger/util-logger";
import {createDatabase, createTables} from "./config/database-config";
import registerToRegistry from "./config/register-to-registry";
import {generateSwaggerDocs} from "./config/swagger";
import VoteRouter from "./app/routers/vote-router";
import MessageConsumer from "./app/middlewares/message-consumer";
import 'dotenv/config';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createDatabase();
createTables();

app.use(MessageConsumer.consumeCommentsActiveQueue);
app.use(VoteRouter);
app.use(ErrorHandler.apiErrorHandler);

registerToRegistry();
const port: number = parseInt(process.env.PORT_VOTES) || 8080;
const url = process.env['COMMENTS_SERVICE_URL_VISIBLE'];
generateSwaggerDocs(app, port);
const server = app.listen(port, () => {
  logger.info(`Listening at ${url}:${port}`);
});
server.on('error', console.error);

