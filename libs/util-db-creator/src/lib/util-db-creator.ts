import {Client} from 'pg';
import logger from '@blogger/util-logger';

const createDatabase = (RDS_USERNAME: string, RDS_PASSWORD: string, RDS_HOSTNAME: string,
                               RDS_EXISTING_DB_NAME: string, RDS_DB_NAME: string): void => {

  const client = createClient(RDS_USERNAME, RDS_PASSWORD, RDS_HOSTNAME, RDS_EXISTING_DB_NAME);

  client.connect();

  client.query(`CREATE DATABASE ${RDS_DB_NAME}`, (err) => {
    if (err) {
      logger.info(`Database ${RDS_DB_NAME} already exists!`);

    } else {
      logger.info(`Database ${RDS_DB_NAME} created!`);
    }
    client.end();
  });
};

const createClient = (RDS_USERNAME: string, RDS_PASSWORD: string, RDS_HOSTNAME: string,
                      RDS_DB_NAME: string): Client => {
  return new Client({
    user: RDS_USERNAME,
    password: RDS_PASSWORD,
    host: RDS_HOSTNAME,
    database: RDS_DB_NAME,
  });
};

export default {
  createDatabase,
  createClient
};
