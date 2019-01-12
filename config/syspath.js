const ROOT = require('path').resolve(process.cwd());

module.exports = {
  ROOT,
  BIN: `${ROOT}/bin`,
  CONFIG: `${ROOT}/config`,
  PUBLIC: `${ROOT}/public`,
  UTILS: `${ROOT}/utils`,
  SRC: `${ROOT}/src`,
  CONTROLLERS: `${ROOT}/src/controllers`,
  MIDDLEWARES: `${ROOT}/src/middlewares`,
  MODELS: `${ROOT}/src/models`,
  RESOURCES: `${ROOT}/resources`,
  ASSETS: `${ROOT}/resources/assets`,
  VIEWS: `${ROOT}/resources/views`,
  STORAGE: `${ROOT}/storage`,
  DATABASE: `${ROOT}/storage/database`,
  LOGS: `${ROOT}/storage/logs`
};
