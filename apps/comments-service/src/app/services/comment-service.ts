import {CommentI} from "../models/comment-model";
import logger from '@blogger/util-logger';
import CommentRepository from "../repositories/comment-repository";
import RabbitManager from "@blogger/rabbitmq-manager";
import {Interfaces} from '@blogger/global-interfaces';
import ArticleService from "./article-service";
import RedisManager from "@blogger/redis-manager";
import 'dotenv/config';
import {CreateCommentResponse} from "../../../../../libs/api-client/src/lib/api/api";

/**
 * The comments can go 4 levels deep, if the comment has a parent, we check it's depth, if the depth is 4, we set
 * the parent.parent_id to the new comment to stop the deeper nesting
 * In case of wrongly passed parent id, we allow the comment as a new comment for better user experience
 */

const create = async (comment: CommentI, articleId: number, toPublish: boolean): Promise<CreateCommentResponse> => {
  let parentComment = null;

  if (comment.parent_id) {
    logger.info(`Looking for parent comment id: ${comment.parent_id}`)
    parentComment = await CommentRepository.findById(comment.parent_id);
  }

  if (parentComment) {

    if (parentComment.depth === 4) {
      comment.parent_id = parentComment.parent_id;
      logger.info(`Stopped deeper nesting for comment, deepest parent id ${parentComment.parent_id}`);
    }
    comment.depth = parentComment.depth < 4 ? parentComment.depth + 1 : parentComment.depth;
    logger.info(`Depth of new comment: ${comment.depth}`);
  } else {
    comment.parent_id = null;
  }

  if (!toPublish) {
    comment.published = false;
    await sendCheckBloggerLifeMessage();
    logger.info(`Comment by ${comment.author} not published, required review of article id ${articleId} origin`);
  }

  comment.article_id = articleId;

  const savedComment = await CommentRepository.create(comment);
  await updateCommentsIdsInCache(savedComment.id);
  logger.info(`Comment successfully created: id: ${savedComment.id}`)
  const result = {
    id: savedComment.id,
    depth: savedComment.depth,
    created_at: savedComment.created_at,
    author: savedComment.author,
    content: savedComment.content,
    parent_id: savedComment.parent_id,
    article_id: savedComment.article_id
  };
  return result;

};

const findAllByArticleId = async (articleId: number): Promise<CommentI[]> => {
  const comments = await CommentRepository.findAllByArticleId(articleId);
  logger.info(`Successfully loaded ${comments.length} threads`)
  sortComments(comments);
  logger.info(`Comments sorted by creation date`);
  return comments;
};

const sortComments = (comments: CommentI[]): void => {
  comments.forEach(child => {
    if (child.children?.length > 0) {
      sort(child);
      child.children.forEach(secondLevel => {
        if (secondLevel.children?.length > 0) {
          sort(secondLevel);
          secondLevel.children.forEach(thirdLevel => {
            if (thirdLevel.children?.length > 0) {
              sort(thirdLevel);
            }
          });
        }
      });
    }
  });
};

const sort = (comment: CommentI): void => {
  comment.children.sort((a, b) => a.created_at - b.created_at);
};

/**
 * when article is deleted, comments service gets the message, deletes the comments and sends message back to hard
 * delete the article -> so no relationship exists anymore, sends message to votes service to delete votes
 */
const deleteByArticleId = async (articleId: number): Promise<void> => {
  try {
    await CommentRepository.deleteByArticleId(articleId);
    await deleteCommentsIdsFromCache();
    logger.info(`Comments with article id ${articleId} successfully deleted`);
    await notifyServices(articleId);
  } catch (e: any) {
    logger.error(`Deleting comments with article id ${articleId} failed ${e}`);
  }
};

const notifyServices = async (articleId: number): Promise<void> => {
  const routingBloggerKey = process.env['COMMENTS_ROUTING_KEY'];
  const routingVotesKey = process.env['VOTES_COMMENTS_DELETED_ARTICLE_ROUTING_KEY'];
  const message: Interfaces.DeletedArticleMessage = {
    deletedId: articleId
  };
  await RabbitManager.publishMessage(routingBloggerKey, message);
  await RabbitManager.publishMessage(routingVotesKey, message);
};

const sendCheckBloggerLifeMessage = async (): Promise<void> => {
  const routingKey = process.env['COMMENTS_BLOGGER_FAIL_ROUTING_KEY'];
  const message: Interfaces.ApiMessage = {
    message: 'Communication failed'
  };
  await RabbitManager.publishMessage(routingKey, message);
};

const validateNotPublishedComments = async (): Promise<void> => {
  const commentsToValidate = await CommentRepository.findAllNotPublished();

  for (const comment of commentsToValidate) {
    if (await ArticleService.doesArticleExist(comment.article_id)) {
      comment.published = true;
      await comment.save();
      logger.info(`Comment ${comment.id} validated and published successfully`)
    } else {
      await comment.destroy();
      logger.info(`Comment ${comment.id} invalid - deleted successfully`);
    }
  }
};

const findCommentsIds = async (): Promise<number[]> => {
  return await CommentRepository.findCommentsIds();
};

const updateCommentsIdsInCache = async (commentId: number): Promise<void> => {
  const redisKey = process.env['REDIS_EXISTING_COMMENTS'];

  try {
    const cachedData = await RedisManager.getData(redisKey);
    const ids = JSON.stringify(cachedData);
    if (Array.isArray(ids)) {
      ids.push(commentId);
      await RedisManager.deleteKey(redisKey);
      await RedisManager.storeToCache(redisKey, 864000, JSON.stringify(ids));
      logger.info(`Comments ids in cache updated: ${JSON.stringify(ids)}`);
    }
  } catch (e: any) {
    logger.error(`Comments ids not updated: ${e.message}`);
  }
};

/**
 * When deleting comments, its mass delete, it's easier for performance to delete the cache data then call to
 * database to get deleted ids, then delete the comments and update cache
 */
const deleteCommentsIdsFromCache = async (): Promise<void> => {
  try {
    const redisKey = process.env['REDIS_EXISTING_COMMENTS'];
    await RedisManager.deleteKey(redisKey);
  } catch (e: any) {
    logger.error(`Deleting cache for comment ids failed: ${e.message}`);
  }
};

export default {
  create,
  findAllByArticleId,
  deleteByArticleId,
  validateNotPublishedComments,
  findCommentsIds
};
