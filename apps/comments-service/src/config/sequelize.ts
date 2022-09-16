import {Sequelize} from "sequelize";
import 'dotenv/config';

const {
  RDS_DB_NAME_COMMENTS,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
} = process.env;

const sequelize: Sequelize = new Sequelize(RDS_DB_NAME_COMMENTS, RDS_USERNAME, RDS_PASSWORD, {
  dialect: 'postgres',
  host: RDS_HOSTNAME,
});

export default sequelize;
