const root = require('path').resolve(process.cwd());

module.exports = {
  root,
  bin: `${root}/bin`,
  config: `${root}/config`,
  database: `${root}/database`,
  dist: `${root}/dist`,
  src: `${root}/src`,
  logs: `${root}/logs`,
  controllers: `${root}/src/app/controllers`,
  middlewares: `${root}/src/app/middlewares`,
  models: `${root}/src/app/models`,
  views: `${root}/src/app/views`
};
