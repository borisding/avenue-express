import uuidv4 from 'uuid/v4';
import cookieSession from 'cookie-session';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import connectFile from 'session-file-store';
import { ENV } from '@config';

const FileStore = connectFile(expressSession);
const RedisStore = connectRedis(expressSession);

// default options for express session middleware
// @see: https://github.com/expressjs/session#sessionoptions
const sessionOptions = {
  genid: () => uuidv4(),
  resave: false,
  saveUninitialized: false,
  secret: ENV['SECRET_KEY']
};

// the default is cookie session registry
// @see: https://github.com/expressjs/cookie-session#cookiesessionoptions
const session = (options = {}) => {
  return cookieSession({
    secret: ENV['SECRET_KEY'],
    ...options
  });
};

// session registry for file storage
// @see: https://github.com/valery-barysok/session-file-store#options
session.file = (options = {}) => {
  return expressSession({
    store: new FileStore({ ...options }),
    ...sessionOptions
  });
};

// session registry for redis storage
// @see: https://github.com/tj/connect-redis#options
session.redis = (options = {}) => {
  return expressSession({
    store: new RedisStore({ ...options }),
    ...sessionOptions
  });
};

export default session;
