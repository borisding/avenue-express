const DEV = require('isdev');
const SYSPATH = require('./syspath');
const ENV = require('./env-properties.json');

// export combined configuration for `./src` usage as a whole
module.exports = {
  DEV,
  ENV,
  SYSPATH
};
