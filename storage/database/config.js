// NOTE:
// This file is originally generated via sequelize migration cli.
// Modified to serve dynamic import for app models & migration

// load .env file based on targeted `NODE_ENV` value
require('../../env');

const getDbConfig = () => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
});

module.exports = {
  development: getDbConfig(),
  production: getDbConfig(),
  test: getDbConfig()
};
