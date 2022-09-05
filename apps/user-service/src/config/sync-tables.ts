import sequelize from './database-config';
import logger from '@blogger/util-logger';

const syncTables = () => {
  sequelize.sync().then((res) => logger.info("Tables synced"));
};

export default syncTables;
