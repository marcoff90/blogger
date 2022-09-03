import sequelize from "./database-config";
import log from "../utils/logger";

const createModels = () => {
  sequelize.sync()
  .then(res => log.info(res));
};

export default createModels;
