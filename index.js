// load environment variables at first place
require('./env');

// start app server
require('./esm')('@bin/server');
