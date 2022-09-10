import {NextFunction, Request, Response} from 'express';
import {ArticleI} from "../models/article-model";
import ArticleService from "../services/article-service";
import {CreateArticleInput} from "../schemas/create-article-schema";
import {CreateArticleResponse} from "../interfaces/create-article-response";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import {GetArticlesByUserIdInput} from "../schemas/get-articles-by-user-id-schema";
import {GetUserArticleResponse} from "../interfaces/get-user-article-response";

const storeArticle = async (req: Request<CreateArticleInput['params'], CreateArticleInput['body']>, res: Response, next: NextFunction) => {
  const {userId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: 'It is forbidden to create articles for different user'}));
  }
    const article: ArticleI = await ArticleService.create(req.body, req.user);
    const response: CreateArticleResponse = {
      id: article.id,
      title: article.title,
      state: article.state,
      image: article.image,
      createdAt: article.createdAt
    }
    res.send(response);
};

const showAllByUserId = async (req: Request<GetArticlesByUserIdInput['params']>, res: Response, next: NextFunction) => {
  const {userId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: `Can't load articles of different user`}));
  } else {
    const response: GetUserArticleResponse[] = await ArticleService.findAllByUserId(req.user);
    res.send(response);
  }
};

export default {
  storeArticle,
  showAllByUserId
};
