/**
 * NOTE:
 * This file is generated via sequelize migration cli.
 * Modified to serve dynamic import for app models & migration
 */
const ENV = require('../config/env-properties');

const getDbConfig = () => ({
  username: ENV['DB_USERNAME'],
  password: ENV['DB_PASSWORD'],
  database: ENV['DB_NAME'],
  host: ENV['DB_HOST'],
  dialect: ENV['DB_DIALECT']
});

module.exports = {
  development: getDbConfig(),
  production: getDbConfig(),
  test: getDbConfig()
};
