// NOTE:
// This file is generated via sequelize migration cli.
// Modified to serve dynamic import for app models & migration

const getDbConfig = () => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

module.exports = {
  development: getDbConfig(),
  production: getDbConfig(),
  test: getDbConfig()
};
