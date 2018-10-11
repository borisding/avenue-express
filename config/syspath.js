const ROOT = require('path').resolve(process.cwd());

module.exports = {
  ROOT,
  BIN: `${ROOT}/bin`,
  BUILD: `${ROOT}/build`,
  CONFIG: `${ROOT}/config`,
  DATABASE: `${ROOT}/database`,
  LOGS: `${ROOT}/logs`,
  PUBLIC: `${ROOT}/public`,
  UTILS: `${ROOT}/utils`,
  SRC: `${ROOT}/src`,
  ASSETS: `${ROOT}/src/assets`,
  CONTROLLERS: `${ROOT}/src/controllers`,
  MIDDLEWARES: `${ROOT}/src/middlewares`,
  MODELS: `${ROOT}/src/models`,
  VIEWS: `${ROOT}/src/views`
};
