/**
 * NOTE:
 * This file is generated via sequelize migration cli.
 * Modified to serve dynamic import for app models & migration
 */
const ENV = require('./env-properties.json');

const getEnvConfig = () => ({
  username: ENV['DB_USERNAME'],
  password: ENV['DB_PASSWORD'],
  database: ENV['DB_NAME'],
  host: ENV['DB_HOST'],
  dialect: ENV['DB_DIALECT']
});

module.exports = {
  development: getEnvConfig(),
  production: getEnvConfig(),
  test: getEnvConfig()
};
