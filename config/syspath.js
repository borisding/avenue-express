const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  app: `${root}/app`,
  assets: `${root}/assets`,
  config: `${root}/config`,
  logger: `${root}/logger`,
  public: `${root}/public`,
  scripts: `${root}/scripts`,
  storage: `${root}/storage`,
  tests: `${root}/tests`,
  utils: `${root}/utils`
};
