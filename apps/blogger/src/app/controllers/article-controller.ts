import {NextFunction, Request, Response} from 'express';
import {ArticleI} from "../models/article-model";
import ArticleService from "../services/article-service";
import {CreateArticleInput} from "../schemas/article-schema";
import {CreateArticleResponse} from "../interfaces/create-article-response";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';

const storeArticle = async (req: Request<CreateArticleInput['body'], CreateArticleInput['headers']>, res: Response, next: NextFunction) => {
  try {
    const article: ArticleI = await ArticleService.create(req.body, req.user);
    const response: CreateArticleResponse = {
      id: article.id,
      title: article.title,
      state: article.state,
      image: article.image,
      createdAt: article.createdAt
    }
    res.send(response);
  } catch (e: any) {
    logger.error(`Saving article failed: ${e.message}`);
    next(ApiError.serverError());
  }
};

export default {
  storeArticle
};
