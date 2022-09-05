import 'dotenv/config';
import Postgres from '@blogger/util-db-creator';
import syncTables from "./sync-tables";

const {
  RDS_DB_NAME,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
  RDS_EXISTING_DB_NAME,
} = process.env;

// first create database if it doesn't exist
export const createDatabase = () => {
  Postgres.createDatabase(RDS_USERNAME, RDS_PASSWORD, RDS_HOSTNAME, RDS_EXISTING_DB_NAME, RDS_DB_NAME);
};

// then check if the database is created if so, sync model tables
export const createTables = () => {
  const client = Postgres.createClient(RDS_USERNAME, RDS_PASSWORD, RDS_HOSTNAME, RDS_DB_NAME);
  client.connect(err => {
    if (err) {
      createTables();
    } else {
      syncTables();
    }
  });
};
