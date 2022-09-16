import Postgres from "@blogger/util-db-creator";
import 'dotenv/config';
import syncTables from "./sync-tables";

const {
  RDS_DB_NAME_COMMENTS,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_HOSTNAME,
  RDS_EXISTING_DB_NAME,
} = process.env;

// first create database if it doesn't exist
export const createDatabase = (): void => {
  Postgres.createDatabase(RDS_USERNAME, RDS_PASSWORD, RDS_HOSTNAME, RDS_EXISTING_DB_NAME, RDS_DB_NAME_COMMENTS);
};

// then check if the database is created if so, sync model tables
export const createTables = (): void => {
  const client = Postgres.createClient(RDS_USERNAME, RDS_PASSWORD, RDS_HOSTNAME, RDS_DB_NAME_COMMENTS);
  client.connect(err => {
    if (err) {
      createTables();
    } else {
      syncTables();
    }
  });
};
