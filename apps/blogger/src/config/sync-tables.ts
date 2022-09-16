import logger from '@blogger/util-logger';
import sequelize from "./sequelize";

const syncTables = (): void => {
  sequelize.sync()
  .then(() => {
    logger.info('Tables synced');
  })
};

export default syncTables;
