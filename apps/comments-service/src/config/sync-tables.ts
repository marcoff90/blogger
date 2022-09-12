import logger from '@blogger/util-logger';
import sequelize from "./sequelize";
import CommentModel from "../app/models/comment-model";

const syncTables = () => {
  CommentModel.hasMany(CommentModel, {
    as: 'children',
    foreignKey: 'parent_id'
  });

  sequelize.sync()
  .then(() => {
    logger.info('Tables synced');
  })
};

export default syncTables;
