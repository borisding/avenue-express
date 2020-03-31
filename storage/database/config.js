// NOTE:
// This file is originally generated via sequelize migration cli.
// Modified to serve for database migration connection

// load .env file based on targeted `NODE_ENV` value
require('../../env.loader');
const { NODE_ENV = 'development' } = process.env;

module.exports = {
  [NODE_ENV]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT
  }
};
