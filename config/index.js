const ENV = require('./env-properties.json');

// assigned with `process.env` or fallback to default port value
// when one of the following is not defined in '.env' file
if (!ENV['PORT']) {
  ENV['PORT'] = +process.env.PORT || 3000;
}

// export built environment properties for app usage
module.exports.ENV = ENV;

// export named `DB` as part of config
module.exports.DB = require('./database');

// export named `SYSPATH` as part of config
module.exports.SYSPATH = require('./syspath');

// export named `DEV` as part of config
module.exports.DEV = require('isdev');
