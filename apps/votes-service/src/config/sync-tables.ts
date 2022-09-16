import logger from '@blogger/util-logger';
import VoteModel from "../app/models/vote-model";

const syncTables = (): void => {
  VoteModel.sync()
  .then(() => {
    logger.info('Tables synced');
  });
};

export default syncTables;
