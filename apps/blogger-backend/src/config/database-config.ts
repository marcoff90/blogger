import {Sequelize} from 'sequelize';
import 'dotenv/config';
import {Client} from 'pg';
import log from '../utils/logger';

const {
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
  RDS_EXISTING_DB_NAME
} = process.env;

export const createDatabase = () => {
  const client = new Client({
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    host: RDS_HOSTNAME,
    database: RDS_EXISTING_DB_NAME
  });

  client.connect();

  client.query(`CREATE DATABASE ${RDS_DB_NAME}`, (err, res) => {
    if (err) {
      log.error('Database already exists!')
    } else {
      log.info(res);
    }
    client.end();
  });
};

const sequelize = new Sequelize(RDS_DB_NAME, RDS_USERNAME,
  RDS_PASSWORD, {
    dialect: 'postgres',
    host: RDS_HOSTNAME
  });

export default sequelize;

