import logger from '@blogger/util-logger';
import ApiModel from "../app/models/api-model";
import ServerModel from "../app/models/server-model";
import sequelize from "./sequelize";

const syncTables = () => {
  ServerModel.hasMany(ApiModel, {
    as: 'apis',
    foreignKey: 'server_id'
  });
  ApiModel.belongsTo(ServerModel, {
    as: 'api',
    foreignKey: 'server_id'
  });
  sequelize.sync().then(() => logger.info("Tables synced"));
};

export default syncTables;
