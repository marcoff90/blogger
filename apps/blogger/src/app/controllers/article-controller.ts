import {NextFunction, Request, Response} from 'express';
import {ArticleI} from "../models/article-model";
import ArticleService from "../services/article-service";
import {CreateArticleInput} from "../schemas/create-article-schema";
import {CreateArticleResponse} from "../interfaces/create-article-response";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import logger from '@blogger/util-logger';
import {GetArticlesByUserIdInput} from "../schemas/get-articles-by-user-id-schema";
import {GetUserArticleResponse} from "../interfaces/get-user-article-response";
import {UpdateArticleInput} from "../schemas/update-article-schema";
import {UpdateArticleResponse} from "../interfaces/update-article-response";
import {DeleteArticleInput} from "../schemas/delete-article-schema";
import {Interfaces} from '@blogger/global-interfaces';

const storeArticle = async (req: Request<CreateArticleInput['params'], CreateArticleInput['body']>,
                            res: Response, next: NextFunction) => {
  const {userId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: `Access denied: user id doesn't match`}));

  } else {
    const article: ArticleI = await ArticleService.create(req.body, req.user);
    const response: CreateArticleResponse = {
      id: article.id,
      title: article.title,
      state: article.state,
      image: article.image,
      createdAt: article.createdAt
    }
    res.send(response);
  }
};

const showAllByUserId = async (req: Request<GetArticlesByUserIdInput['params']>, res: Response, next: NextFunction) => {
  const {userId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: `Access denied: user id doesn't match`}));

  } else {
    const response: GetUserArticleResponse[] = await ArticleService.findAllByUserId(req.user);
    res.send(response);
  }
};

const updateArticle = async (req: Request<UpdateArticleInput['params'], UpdateArticleInput['body']>,
                             res: Response, next: NextFunction) => {
  const {userId} = req.params;
  const {articleId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: `Access denied: user id doesn't match`}));
  }

  if (!await ArticleService.doesArticleExist(req.user, parseInt(articleId))) {
    logger.error(`Article not found: id ${articleId}, userId: ${req.user['id']}`);
    next(ApiError.notFound({error: 'Article not found'}));

  } else {
    const updated: UpdateArticleResponse = await ArticleService.updateByIdAndUserId(req.user,
      parseInt(articleId), req.body);
    res.send(updated);
  }
};

const deleteArticle = async (req: Request<DeleteArticleInput['params']>, res: Response, next: NextFunction) => {
  const {userId} = req.params;
  const {articleId} = req.params;

  if (userId != req.user['id']) {
    logger.error(`Blocked access to user id: ${req.user['id']} to user id: ${userId} account`);
    next(ApiError.forbidden({error: `Access denied: user id doesn't match`}));
  }

  if (!await ArticleService.doesArticleExist(req.user, parseInt(articleId))) {
    logger.error(`Article not found: id ${articleId}, userId: ${req.user['id']}`);
    next(ApiError.notFound({error: 'Article not found'}));

  } else {
    const deleted = await ArticleService.softDelete(req.user, parseInt(articleId));
    if (deleted) {
      const response: Interfaces.ApiMessage = {
        message: `Article id: ${articleId} deleted successfully`,
      }
      res.send(response);
    } else {
      next();
    }
  }
};

export default {
  storeArticle,
  showAllByUserId,
  updateArticle,
  deleteArticle
};
