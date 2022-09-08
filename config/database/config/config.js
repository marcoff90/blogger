require('dotenv').config()

module.exports = {
  development: {
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME_USER_SERVICE,
    "host": process.env.RDS_HOSTNAME,
    "dialect": process.env.DIALECT,

    // Use a different storage type. Default: sequelize
    "migrationStorage": "json",

    // Use a different file name. Default: sequelize-meta.json
    "migrationStoragePath": "sequelizeMeta.json",
  },
  test: {
    "username": "postgres",
    "password": "postgres",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  production: {
    "username": "postgres",
    "password": "postgres",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
