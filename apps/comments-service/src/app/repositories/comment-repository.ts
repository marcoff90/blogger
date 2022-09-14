import CommentModel, {CommentI} from "../models/comment-model";

const create = async (comment: CommentI): Promise<CommentI> => {
  return await CommentModel.create(comment);
};

const findAllByArticleId = async (articleId: number): Promise<CommentI[]> => {
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

export default {
  findAllByArticleId,
  findById,
  create,
  deleteByArticleId
};
