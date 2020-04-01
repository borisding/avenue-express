const slash = require('slash');
const { exec } = require('child_process');
const { print } = require('@utils');
const { syspath } = require('@config');
const { prettyFormat } = require('../utils');

module.exports = (env = 'development') => (command, options) => {
  // set `NODE_ENV` value for Sequelize CLI
  // default value is `development`
  process.env.NODE_ENV = env;

  let checkInfo = input => /help|version/.test(input);
  let sequelize = `${syspath.root}/node_modules/.bin/sequelize`;
  let commandInfo = checkInfo(command);
  let subCommandInfo = !commandInfo && options._[0] && checkInfo(options._[0]);

  if (commandInfo) {
    // check command info
    sequelize = `${sequelize} --${command}`;
  } else if (subCommandInfo) {
    // check subcommand info
    sequelize = `${sequelize} ${command} --${options._[0]}`;
  } else {
    // command itself
    sequelize = `${sequelize} ${command}`;
  }

  // populate options string
  delete options._;
  let opts = Object.keys(options)
    .map(opt => `--${opt} ${options[opt]}`)
    .join(' ');

  return exec(`${sequelize} ${opts}`, (err, stdout) => {
    print.info(`\nSequelize command: ${slash(sequelize)}`);

    if (err) {
      return print.error(`ERROR: ${err}`);
    }

    if (/model:generate/.test(command)) {
      prettyFormat('models-path', options);
    }

    return print.success(stdout);
  });
};
