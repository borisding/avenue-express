const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  app: `${root}/app`,
  bin: `${root}/bin`,
  config: `${root}/config`,
  logger: `${root}/logger`,
  public: `${root}/public`,
  storage: `${root}/storage`,
  tests: `${root}/tests`,
  utils: `${root}/utils`
};
