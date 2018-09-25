const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  bin: `${root}/bin`,
  build: `${root}/build`,
  config: `${root}/config`,
  database: `${root}/database`,
  public: `${root}/public`,
  src: `${root}/src`,
  logs: `${root}/logs`,
  assets: `${root}/src/assets`,
  controllers: `${root}/src/app/controllers`,
  middlewares: `${root}/src/app/middlewares`,
  models: `${root}/src/app/models`,
  views: `${root}/src/app/views`
};
