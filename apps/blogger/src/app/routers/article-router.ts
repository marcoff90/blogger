import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {createArticleSchema} from "../schemas/article-schema";
import Auth from '@blogger/middleware-auth';
import ArticleController from "../controllers/article-controller";

const ArticleRouter = Router();

ArticleRouter.post('/blogger-service-api/articles', Validator.validate(createArticleSchema),
  Auth.authorize, ArticleController.storeArticle);

export default ArticleRouter;
