import express, {Express} from 'express';
import cors from "cors";
import logger from "@blogger/util-logger";
import 'dotenv/config';
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./app/types/type-defs";
import resolvers from "./app/resolvers/resolvers";
import {ArticleDataSource} from "./app/datasources/ArticleDataSource";
import { CommentDataSource } from './app/datasources/CommentDataSource';
import { VoteDataSource } from './app/datasources/VoteDataSource';
import registerToRegistry from "./config/register-to-registry";
import {generateSwaggerDocs} from "./config/swagger";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({
    token: req.headers.authorization
  }),
  dataSources: () => ({
    bloggerApi: new ArticleDataSource(),
    commentApi: new CommentDataSource(),
    voteApi: new VoteDataSource()
  })
});

server.start().then(() => {
  logger.info(`Apollo Server started`);
  server.applyMiddleware({app, path: '/graphql-service-api/graphql'});
});

registerToRegistry();
const port: number = parseInt(process.env.PORT_GRAPHQL) || 8080;
const url = process.env['GRAPHQL_SERVICE_URL_VISIBLE'];
generateSwaggerDocs(app, port);
app.listen(port, () => {
  logger.info(`Apollo Server listening at ${url}:${port}/graphql-service-api/graphql`);
});
