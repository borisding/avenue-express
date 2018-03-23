import isDev from 'isdev';
import getenv from 'getenv';
import syspath from './syspath';

// read environment variables, default values will be read if not available in `.env`
// format: ['defined value', 'default value', 'value data type']
const sysenv = getenv.multi({
  PROTOCOL: ['PROTOCOL', 'http', 'string'],
  HOST: ['HOST', 'localhost', 'string'],
  PORT: ['PORT', 3000, 'int'],

  VIEW_ENGINE: ['VIEW_ENGINE', 'ejs', 'string'],
  REQUEST_TIMEOUT: ['REQUEST_TIMEOUT', 5000, 'int'],
  SECRET_KEY: ['SECRET_KEY', 'this.is.default.secret.key', 'string']
});

// display logs for development mode
if (isDev) {
  console.log('Environment Variables:');
  console.log(JSON.stringify(sysenv, null, 2));
  console.log();
}

export default sysenv;
