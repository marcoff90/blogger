import logger from '@blogger/util-logger';
import {NextFunction, Response, Request} from "express";
import {CreateCommentInput} from "../schemas/create-comment-schema";
import CommentService from "../services/comment-service";
import ArticleService from "../services/article-service";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {GetCommentsSchema} from "../schemas/get-comments-schema";
import { Interfaces } from '@blogger/global-interfaces';

/**
 * When we create comment, we want to be sure the article associated with comment exists (if we'd add comment to
 * nonexistent id, the id might exist in future -> we'd have irrelevant comment). If the comment service doesn't
 * find the id in cache and blogger service is unresponsive, we save the comment to be validated
 * Comments service sends rabbit message to blogger service, that once is online, sends message back and comments
 * service knows to start the query to find all unpublished comments and validate. In case of invalid comment ->
 * comment is deleted
 */

const create = async (req: Request<CreateCommentInput['params'], CreateCommentInput['body']>, res: Response, next: NextFunction) => {
  const {articleId} = req.params;

  try {
    if (!await ArticleService.doesArticleExist(parseInt(articleId))) {
      logger.error(`Article not found: id: ${articleId}`);
      next(ApiError.notFound({error: 'Article not found'}));
    } else {
      const comment = await CommentService.create(req.body, parseInt(articleId), true);
      res.send(comment);
    }
  } catch (e: any) {
    logger.error(`Could not verify article existence: id ${articleId}. Subjecting the comment to review.
    Error: ${e.message}`);
    await CommentService.create(req.body, parseInt(articleId), false);
    const response: Interfaces.ApiMessage = {
      message: 'Comment submitted to review'
    }
    res.status(202).send(response);
  }
};

const showAll = async (req: Request<GetCommentsSchema['params']>, res: Response, next: NextFunction) => {
  const {articleId} = req.params;

  try {
      const comments = await CommentService.findAllByArticleId(parseInt(articleId));
      res.send(comments);
  } catch (e: any) {
    logger.error(`Loading comments for article id: ${articleId} failed: ${e.message}`);
    next(ApiError.serverError());
  }

};

export default {
  showAll,
  create
};
