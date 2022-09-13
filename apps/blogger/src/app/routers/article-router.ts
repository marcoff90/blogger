import {Router} from "express";
import Validator from '@blogger/middleware-validator';
import {createArticleSchema} from "../schemas/create-article-schema";
import Auth from '@blogger/middleware-auth';
import ArticleController from "../controllers/article-controller";
import {getArticlesByUserIdSchema} from "../schemas/get-articles-by-user-id-schema";
import {updateArticleSchema} from "../schemas/update-article-schema";
import {deleteArticleSchema} from "../schemas/delete-article-schema";
import {getArticlesByUsernameSchema} from "../schemas/get-articles-by-username-schema";
import MessageConsumer from "../middlewares/message-consumer";

const ArticleRouter = Router();

ArticleRouter.post('/blogger-service-api/bloggers/:userId/articles', Validator.validate(createArticleSchema),
  Auth.authorize, ArticleController.storeArticle);

ArticleRouter.get('/blogger-service-api/bloggers/:userId/articles', Validator.validate(getArticlesByUserIdSchema),
  Auth.authorize, ArticleController.showAllByUserId);

ArticleRouter.put('/blogger-service-api/bloggers/:userId/articles/:articleId', Validator.validate(updateArticleSchema),
  Auth.authorize, ArticleController.updateArticle);

ArticleRouter.delete('/blogger-service-api/bloggers/:userId/articles/:articleId', Validator.validate(deleteArticleSchema),
  Auth.authorize, ArticleController.deleteArticle);

/**
 * listening on exchange on public side of the app, since the data is mostly cached
 */

ArticleRouter.get('/blogger-service-api/featured-blogs', MessageConsumer.consumeMessages, ArticleController.showFiveFeaturedArticles);

ArticleRouter.get('/blogger-service-api/blogs/:username/articles', Validator.validate(getArticlesByUsernameSchema),
  MessageConsumer.consumeMessages, ArticleController.findArticlesByUsername);

export default ArticleRouter;
