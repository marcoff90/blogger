import VoteModel, {VoteI} from "../models/vote-model";
import sequelize from "../../config/sequelize";
import {SequelizeMethod} from "sequelize/types/utils";
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const create = async (vote: VoteI): Promise<VoteI> => {
  return await VoteModel.create(vote);
};

const upsert = async (articleId: number, commentId: number, ipAddress: string,
                      upvote: boolean, downvote: boolean, published: boolean): Promise<VoteI> => {
  return VoteModel.findOne({
    where: {
      article_id: articleId,
      comment_id: commentId,
      ip_address: ipAddress
    }
  })
  .then((vote) => {
    if (vote) {
      return vote.update({
        upvote: upvote,
        downvote: downvote
      })
    }
    return VoteModel.create({
      article_id: articleId,
      comment_id: commentId,
      ip_address: ipAddress,
      upvote: upvote,
      downvote: downvote,
      published: published
    })
  });
};

const deleteByArticleIdCommentIdIpAddress = async (articleId: number, commentId: number,
                                                   ipAddress: string): Promise<void> => {
  await VoteModel.destroy({
    where: {
      article_id: articleId,
      comment_id: commentId,
      ip_address: ipAddress,
    }
  });
};

const findAllNotPublished = async (): Promise<VoteI[]> => {
  return await VoteModel.findAll({
    where: {
      published: false
    }
  });
};

const findCountOfVotesByArticleAndCommentId = async (articleId: number,
                                                     commentId: number): Promise<SequelizeMethod> => {
  return await VoteModel.findAll({
    where: {
      article_id: articleId,
      comment_id: commentId,
      published: true
    },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("upvote")), "upvotes"],
      [sequelize.fn("COUNT", sequelize.col("downvote")), "downvotes"]
    ],
    raw: true
  });
};

const findVotesCountByArticleId = async (articleId: number): Promise<SequelizeMethod> => {
  return await VoteModel.findAll({
    where: {
      article_id: articleId,
      published: true
    },
    attributes: [
      'comment_id',
      [sequelize.fn("COUNT", sequelize.col("upvote")), "upvotes"],
      [sequelize.fn("COUNT", sequelize.col("downvote")), "downvotes"]
    ],
    group: 'comment_id',
    raw: true
  });
};

const deleteByArticleId = async (articleId: number): Promise<void> => {
  await VoteModel.destroy({
    where: {
      article_id: articleId
    }
  });
};

export default {
  create,
  findVotesCountByArticleId,
  upsert,
  deleteByArticleIdCommentIdIpAddress,
  findAllNotPublished,
  findCountOfVotesByArticleAndCommentId,
  deleteByArticleId
};
