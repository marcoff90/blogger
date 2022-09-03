import express from 'express';
import {createDatabase} from "./config/database-config";
import cors from 'cors';
import 'dotenv/config';
import log from "./utils/logger";
import swaggerDocs from "./utils/swagger";
import UserRouter from "./app/routers/user-router";
import createModels from "./config/init-tables";
import apiErrorHandler from "./app/middlewares/api-error-handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

createDatabase();
createModels();
app.use(UserRouter);
app.use(apiErrorHandler);

const port: number = parseInt(process.env.PORT) || 3000;
const server = app.listen(port, () => {
  log.info(`Listening at http://localhost:${port}`);
  swaggerDocs(app, port);
});
server.on('error', console.error);
