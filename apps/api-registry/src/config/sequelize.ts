import {Sequelize} from "sequelize";

const {
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
} = process.env;

const sequelize = new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
  dialect: 'postgres',
  host: RDS_HOSTNAME,
});

export default sequelize;
