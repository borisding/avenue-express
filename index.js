// make promises safe to avoid unhandled rejection
require('make-promises-safe');

// register module aliases of porject directories
require('module-alias/register');

// load environment variables at first place
require('./env.loader');

// start app server
require('./bin/server');
