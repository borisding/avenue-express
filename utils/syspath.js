const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  app: `${root}/app`,
  assets: `${root}/assets`,
  build: `${root}/build`,
  config: `${root}/config`,
  logger: `${root}/logger`,
  scripts: `${root}/scripts`,
  storage: `${root}/storage`,
  tests: `${root}/tests`,
  utils: `${root}/utils`
};
