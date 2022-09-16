import VoteRepository from "../repositories/vote-repository";
import {VoteI} from "../models/vote-model";
import RabbitManager from "@blogger/rabbitmq-manager";
import {Interfaces} from "@blogger/global-interfaces";
import logger from "@blogger/util-logger";
import CommentsService from "./comments-service";
import {VotesCount} from "../interfaces/votes-count";
import 'dotenv/config';

/**
 * handles multiple operation
 * - use cases
 *    -> user submits new vote with upvote or downvote -> creates
 *    -> user takes back his vote -> upvote and downvote both null -> vote deleted
 *    -> user changes opinion and sends different vote than we have stored with his ip address -> updates the value
 * - at UI it's more effective to use one endpoint for one click with the values
 */

const upsert = async (downvote: boolean, upvote: boolean, ipAddress: string,
                              articleId: number, commentId: number, published: boolean): Promise<VoteI> => {

  if (upvote === null && downvote === null) {
    await VoteRepository.deleteByArticleIdCommentIdIpAddress(articleId, commentId, ipAddress);
    logger.info(`Deleted vote due to passed upvote and downvote being null for comment id: ${commentId}`)
    return null;
  }

  if (!published) {
    await sendCheckCommentsLifeMessage();
    logger.info(`Vote not published, required review of comment of id: ${commentId} origin`);
  }
  const vote: VoteI = await VoteRepository.upsert(articleId, commentId, ipAddress, upvote, downvote, published);
  logger.info(`Vote successfully created: comment_id: ${vote.comment_id}`);
  return vote;
};

const validateNotPublishedVotes = async (): Promise<void> => {
  const votesToValidate: VoteI[] = await VoteRepository.findAllNotPublished();

  for (const vote of votesToValidate) {
    if (await CommentsService.doesCommentExist(vote.comment_id)) {
      vote.published = true;
      await vote.save();
      logger.info(`Vote for comment id ${vote.comment_id} validated and published successfully`)
    } else {
      await vote.destroy();
      logger.info(`Vote for comment id ${vote.comment_id} invalid - deleted successfully`);
    }
  }
};

const sendCheckCommentsLifeMessage = async (): Promise<void> => {
  const routingKey = process.env['VOTES_COMMENTS_FAIL_ROUTING_KEY'];
  const message: Interfaces.ApiMessage = {
    message: 'Communication failed'
  };
  await RabbitManager.publishMessage(routingKey, message);
};

const findByArticleAndCommentId = async (articleId: number, commentId: number): Promise<VotesCount[]> => {
  const votesCount = await VoteRepository.findCountOfVotesByArticleAndCommentId(articleId, commentId);
  return Object.assign([] as VotesCount[], votesCount);
};

const getAllCommentsStatsForArticle = async (articleId: number): Promise<VotesCount[]> => {
  const votesCount = await VoteRepository.findVotesCountByArticleId(articleId);
  return Object.assign([] as VotesCount[], votesCount);
};

/**
 * based on message from comments service -> article deleted -> comments deleted -> votes deleted
 */

const deleteByArticleId = async (articleId: number): Promise<void> => {
  try {
    await VoteRepository.deleteByArticleId(articleId);
    logger.info(`Votes with articleId ${articleId} deleted`);
  } catch (e: any) {
    logger.error(`Deleting votes with articleId ${articleId} failed`);
  }
};

export default {
  upsert,
  validateNotPublishedVotes,
  findByArticleAndCommentId,
  getAllCommentsStatsForArticle,
  deleteByArticleId
};
