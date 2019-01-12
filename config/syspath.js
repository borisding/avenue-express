const ROOT = require('path').resolve(process.cwd());

module.exports = {
  ROOT,
  APP: `${ROOT}/app`,
  BIN: `${ROOT}/bin`,
  CONFIG: `${ROOT}/config`,
  PUBLIC: `${ROOT}/public`,
  UTILS: `${ROOT}/utils`,
  CONTROLLERS: `${ROOT}/app/controllers`,
  MIDDLEWARES: `${ROOT}/app/middlewares`,
  MODELS: `${ROOT}/app/models`,
  RESOURCES: `${ROOT}/resources`,
  ASSETS: `${ROOT}/resources/assets`,
  VIEWS: `${ROOT}/resources/views`,
  STORAGE: `${ROOT}/storage`,
  DATABASE: `${ROOT}/storage/database`,
  LOGS: `${ROOT}/storage/logs`
};
