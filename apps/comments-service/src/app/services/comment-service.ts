import {CommentI} from "../models/comment-model";
import logger from '@blogger/util-logger';
import CommentRepository from "../repositories/comment-repository";

const create = async (comment: CommentI, articleId: number) => {
  let parentComment = null;

  if (comment.parent_id) {
    logger.info(`Looking for parent comment id: ${comment.parent_id}`)
    parentComment = await CommentRepository.findById(comment.parent_id);
  }
  if (parentComment) {

    if (parentComment.depth === 4) {
      // the comments go 4 level deep at max -> no nesting afterwards
      comment.parent_id = parentComment.parent_id;
      logger.info(`Stopped deeper nesting for comment, deepest parent id ${parentComment.parent_id}`);
    }
    comment.depth = parentComment.depth < 4 ? parentComment.depth + 1 : parentComment.depth;
    logger.info(`Depth of new comment: ${comment.depth}`);
  } else {
    // for better user experience, if the parent comment isn't found, add comment as root comment instead of 404
    comment.parent_id = null;
  }

  comment.article_id = articleId;

  const savedComment = await CommentRepository.create(comment);
  logger.info(`Comment successfully created: id: ${savedComment.id}`)
  return savedComment;

};

const findAllByArticleId = async (articleId: number) => {
  const comments = await CommentRepository.findAllByArticleId(articleId);
  logger.info(`Successfully loaded ${comments.length} comments`)
  sortComments(comments);
  logger.info(`Comments sorted by creation date`);
  return comments;
};

const sortComments = (comments: CommentI[]) => {
  comments.forEach(child => {
    if (child.children.length > 0) {
      sort(child);
      child.children.forEach(secondLevel => {
        if (secondLevel.children.length > 0) {
          sort(secondLevel);
          secondLevel.children.forEach(thirdLevel => {
            if (thirdLevel.children.length > 0) {
              sort(thirdLevel);
            }
          });
        }
      });
    }
  });
};

const sort = (comment: CommentI) => {
  comment.children.sort((a, b) => a.created_at - b.created_at);
};

export default {
  create,
  findAllByArticleId
};
