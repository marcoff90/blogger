import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {createArticleSchema} from "../schemas/create-article-schema";
import Auth from '@blogger/middleware-auth';
import ArticleController from "../controllers/article-controller";
import {getArticlesByUserIdSchema} from "../schemas/get-articles-by-user-id-schema";

const ArticleRouter = Router();

ArticleRouter.post('/blogger-service-api/articles/:userId', Validator.validate(createArticleSchema),
  Auth.authorize, ArticleController.storeArticle);

ArticleRouter.get('/blogger-service-api/articles/:userId', Validator.validate(getArticlesByUserIdSchema),
  Auth.authorize, ArticleController.showAllByUserId);

export default ArticleRouter;
