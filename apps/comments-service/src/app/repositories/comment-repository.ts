import CommentModel, {CommentI} from "../models/comment-model";

const create = async (comment: CommentI) => {
  return await CommentModel.create(comment);
};

const findAllByArticleId = async (articleId: number) => {
  return await CommentModel.findAll({
    where: {
      article_id: articleId,
      parent_id: null,
    },
    include: [{
      model: CommentModel,
      as: 'children',
      nested: true,
      include: [{
        model: CommentModel,
        as: 'children',
        nested: true,
        include: [{
          model: CommentModel,
          as: 'children',
          nested: true,
        }],
      }],
    }],
    order: ['created_at'],
  })
};

const findById = async (commentId: number) => {
  return await CommentModel.findOne({
    where: {
      id: commentId
    }
  })
};

const deleteByArticleId = async (articleId: number) => {
  await CommentModel.destroy({
    where: {
      article_id: articleId
    }
  })
};

export default {
  findAllByArticleId,
  findById,
  create,
  deleteByArticleId
};
