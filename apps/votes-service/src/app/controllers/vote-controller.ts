import VoteService from "../services/vote-service";
import logger from '@blogger/util-logger';
import {NextFunction, Response, Request} from "express";
import {CreateVoteInput} from "../schemas/create-vote-schema";
import CommentsService from "../services/comments-service";
import ApiError from "../../../../../libs/middleware-api-error/src/lib/error/api-error";
import {Interfaces} from "@blogger/global-interfaces";
import {GetVotesForOneCommentInput} from "../schemas/get-votes-for-one-comment";
import {VotesCount} from "../interfaces/votes-count";
import {GetVotesForArticleCommentsInput} from "../schemas/get-votes-for-article-coments";

/**
 * Same logic as when we create comment for article -> we need to know the comment exists. the ids are cached and
 * compared, if from any reason we dont have ids, the vote is saved and checked later on, when we can compare the ids ->
 * the communication handled through rabbit mq same as in blogger-comments relationship
 */

const storeOrUpdate = async (req: Request<CreateVoteInput['params'], CreateVoteInput['body']>, res: Response, next: NextFunction) => {
  const {articleId, commentId} = req.params;
  const {downvote, upvote} = req.body;
  const ipAddress = req.ip;

  try {
    if (!await CommentsService.doesCommentExist(parseInt(commentId))) {
      logger.error(`Comment not found: id: ${commentId}`);
      next(ApiError.notFound({error: 'Comment not found'}))

    } else {
      const vote = await VoteService.upsert(downvote, upvote, ipAddress, parseInt(articleId), parseInt(commentId),
        true);

      let response: Interfaces.ApiMessage = {
        message: ''
      }
      if (vote) {
        response.message = 'Vote added'
        res.status(201).send(response);
      } else {
        response.message = 'Vote annulled';
        res.send(response);
      }
    }
  } catch (e: any) {
    logger.error(`Could not verify comment's existence: id: ${commentId}. Subjecting vote to review.
    Error: ${e.message}`);

    await VoteService.upsert(downvote, upvote, ipAddress, parseInt(articleId), parseInt(commentId), false);
    const response: Interfaces.ApiMessage = {
      message: 'Vote submitted to review'
    }
    res.status(202).send(response);
  }
};

const showCountByCommentIdArticleId = async (req: Request<GetVotesForOneCommentInput['params']>, res: Response,
                                             next: NextFunction) => {
  const {articleId, commentId} = req.params;
  try {
    const result: VotesCount[] = await VoteService.findByArticleAndCommentId(parseInt(articleId), parseInt(commentId));
    res.send(result);
  } catch (e: any) {
    logger.error(`Loading of votes count for article ${articleId} and comment ${commentId} failed: ${e.message}`);
    next(ApiError.serverError());
  }
};

const showAllForArticle = async (req: Request<GetVotesForArticleCommentsInput['params']>, res: Response,
                                 next: NextFunction) => {
  const {articleId} = req.params;
  try {
    const result: VotesCount[] = await VoteService.getAllCommentsStatsForArticle(1);
    res.send(result);
  } catch (e: any) {
    logger.error(`Loading of votes count for article ${articleId}  failed: ${e.message}`);
    next(ApiError.serverError());
  }
};

export default {
  storeOrUpdate,
  showCountByCommentIdArticleId,
  showAllForArticle
};
