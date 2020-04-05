const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { syspath } = require('@config');

const sessionFileStore = () =>
  session({
    store: new FileStore({ path: `${syspath.storage}/sessions` }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: parseInt(process.env.COOKIE_MAXAGE, 10) }
  });

module.exports = sessionFileStore;
