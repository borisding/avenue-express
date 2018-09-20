/**
 * NOTE:
 * This file is generated via sequelize migration cli.
 * Modified to serve dynamic import for app models & migration
 */
const ENV = require('./env-properties.json');

module.exports = {
  development: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: ENV['DB_NAME'],
    host: ENV['DB_HOST'],
    dialect: ENV['DB_DIALECT']
  },
  test: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: ENV['DB_NAME'],
    host: ENV['DB_HOST'],
    dialect: ENV['DB_DIALECT']
  },
  production: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: ENV['DB_NAME'],
    host: ENV['DB_HOST'],
    dialect: ENV['DB_DIALECT']
  }
};
