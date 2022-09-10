import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {createArticleSchema} from "../schemas/create-article-schema";
import Auth from '@blogger/middleware-auth';
import ArticleController from "../controllers/article-controller";
import {getArticlesByUserIdSchema} from "../schemas/get-articles-by-user-id-schema";
import {updateArticleSchema} from "../schemas/update-article-schema";
import {deleteArticleSchema} from "../schemas/delete-article-schema";

const ArticleRouter = Router();

ArticleRouter.post('/blogger-service-api/bloggers/:userId/articles', Validator.validate(createArticleSchema),
  Auth.authorize, ArticleController.storeArticle);

ArticleRouter.get('/blogger-service-api/bloggers/:userId/articles', Validator.validate(getArticlesByUserIdSchema),
  Auth.authorize, ArticleController.showAllByUserId);

ArticleRouter.put('/blogger-service-api/bloggers/:userId/articles/:articleId', Validator.validate(updateArticleSchema),
  Auth.authorize, ArticleController.updateArticle);

ArticleRouter.delete('/blogger-service-api/bloggers/:userId/articles/:articleId', Validator.validate(deleteArticleSchema),
  Auth.authorize, ArticleController.deleteArticle);

ArticleRouter.get('/blogger-service-api/featured-blogs', ArticleController.showFiveFeaturedArticles);

export default ArticleRouter;
