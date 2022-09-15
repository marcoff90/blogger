import CommentModel, {CommentI} from "../models/comment-model";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const create = async (comment: CommentI): Promise<CommentI> => {
  return await CommentModel.create(comment);
};

/**
 * Find all related comments to article
 * Required makes the query to left outer join which allows to find all, not just the first related models (first
 * thread)
 */

const findAllByArticleId = async (articleId: number): Promise<CommentI[]> => {
  return await CommentModel.findAll({
    where: {
      article_id: articleId,
      parent_id: null,
      published: true
    },
    attributes: {
      exclude: ['depth', 'published']
    },
    include: [{
      model: CommentModel,
      as: 'children',
      nested: true,
      required: false,
      where: {
        published: true
      },
      attributes: {
        exclude: ['depth', 'published']
      },

      include: [{
        model: CommentModel,
        as: 'children',
        nested: true,
        required: false,
        where: {
          published: true
        },
        attributes: {
          exclude: ['depth', 'published']
        },

        include: [{
          model: CommentModel,
          as: 'children',
          nested: true,
          required: false,
          where: {
            published: true
          },
          attributes: {
            exclude: ['depth', 'published']
          },
        }],
      }],
    }],
    order: ['created_at'],
  });
};

const findById = async (commentId: number): Promise<CommentI> => {
  return await CommentModel.findOne({
    where: {
      id: commentId
    }
  });
};

const deleteByArticleId = async (articleId: number): Promise<void> => {
  await CommentModel.destroy({
    where: {
      article_id: articleId
    }
  });
};

const findAllNotPublished = async (): Promise<CommentI[]> => {
  return await CommentModel.findAll({
    where: {
      published: false
    }
  });
};

const findCommentsIds = async (): Promise<number[]> => {
  return CommentModel.findAll({
    where: {
      published: true
    },
    attributes: ['id'],
    raw: true
  })
  .then(comments => comments.map(comment => comment.id));
};

export default {
  findAllByArticleId,
  findById,
  create,
  deleteByArticleId,
  findAllNotPublished,
  findCommentsIds
};
