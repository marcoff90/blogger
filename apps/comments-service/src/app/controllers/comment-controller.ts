import logger from '@blogger/util-logger';
import {NextFunction, Response, Request} from "express";
import {CreateCommentInput} from "../schemas/create-comment-schema";
import CommentService from "../services/comment-service";
import ArticleService from "../services/article-service";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {GetCommentsSchema} from "../schemas/get-comments-schema";

const create = async (req: Request<CreateCommentInput['params'], CreateCommentInput['body']>, res: Response, next: NextFunction) => {
  const {articleId} = req.params;

  try {
    if (!await ArticleService.doesArticleExist(parseInt(articleId))) {
      logger.error(`Article not found: ${articleId}`);
      next(ApiError.notFound({error: 'Article not found'}));
    } else {
      const comment = await CommentService.create(req.body, parseInt(articleId));
      res.send(comment);
    }
  } catch (e: any) {
    logger.error(`Saving comment for article id: ${articleId} failed: ${e.message}`);
    next(ApiError.serverError());
  }
};

const showAll = async (req: Request<GetCommentsSchema['params']>, res: Response, next: NextFunction) => {
  const {articleId} = req.params;

  try {
    if (!await ArticleService.doesArticleExist(parseInt(articleId))) {
      logger.error(`Article not found: ${articleId}`);
      next(ApiError.notFound({error: 'Article not found'}));
    } else {
      const comments = await CommentService.findAllByArticleId(parseInt(articleId));
      res.send(comments);
    }
  } catch (e: any) {
    logger.error(`Loading comments for article id: ${articleId} failed: ${e.message}`);
    next(ApiError.serverError());
  }

};

export default {
  showAll,
  create
};
