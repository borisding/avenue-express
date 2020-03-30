// load environment variables at first place
require('./env');

// register module alises of porject directories
require('module-alias/register');

// start app server
require('@bin/server');
