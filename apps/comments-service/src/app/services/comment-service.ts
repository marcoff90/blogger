import {CommentI} from "../models/comment-model";
import logger from '@blogger/util-logger';
import CommentRepository from "../repositories/comment-repository";
import RabbitManager from "@blogger/rabbitmq-manager";
import {Interfaces} from '@blogger/global-interfaces';
import ArticleService from "./article-service";
/**
 * The comments can go 4 levels deep, if the comment has a parent, we check it's depth, if the depth is 4, we set
 * the parent.parent_id to the new comment to stop the deeper nesting
 * In case of wrongly passed parent id, we allow the comment as a new comment for better user experience
 */

const create = async (comment: CommentI, articleId: number, toPublish: boolean): Promise<CommentI> => {
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
  logger.info(`Comment successfully created: id: ${savedComment.id}`)
  return savedComment;

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
 * delete the article -> so no relationship exists anymore,
 * TODO sends message to vote service to delete votes
 */
const deleteByArticleId = async (articleId: number): Promise<void> => {

  try {
    await CommentRepository.deleteByArticleId(articleId);
    logger.info(`Comments with article id ${articleId} successfully deleted`);
    await notifyBloggerService(articleId);
  } catch (e: any) {
    logger.error(`Deleting comments with article id ${articleId} failed`);
  }
};

const notifyBloggerService = async (articleId: number): Promise<void> => {
  const routingKey = process.env['COMMENTS_ROUTING_KEY'];
  const message: Interfaces.DeletedArticleMessage = {
    deletedId: articleId
  };
  await RabbitManager.publishMessage(routingKey, message);
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

export default {
  create,
  findAllByArticleId,
  deleteByArticleId,
  validateNotPublishedComments
};
