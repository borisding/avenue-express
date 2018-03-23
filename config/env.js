import dotenv from 'dotenv';
import getenv from 'getenv';
import syspath from './syspath';

// load environment variable config `.env`;
dotenv.config({ path: `${syspath.config}/.env` });

// read environment variables, default values will be read if not available in `.env`
// format: ['defined value', 'default value', 'value data type']
const env = getenv.multi({
  PROTOCOL: ['PROTOCOL', 'http', 'string'],
  HOST: ['HOST', 'localhost', 'string'],
  PORT: ['PORT', 5000, 'int'],

  VIEW_ENGINE: ['VIEW_ENGINE', 'ejs', 'string'],
  REQUEST_TIMEOUT: ['REQUEST_TIMEOUT', 5000, 'int'],
  SECRET_KEY: ['SECRET_KEY', 'this.is.default.secret.key', 'string']
});

//console.info(env);

export default env;
