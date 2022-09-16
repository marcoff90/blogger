import sequelize from './database-config';
import logger from '@blogger/util-logger';

const syncTables = (): void => {
  sequelize.sync().then(() => logger.info("Tables synced"));
};

export default syncTables;
