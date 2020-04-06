const slash = require('slash');
const { cyan, green, red } = require('chalk');
const { exec } = require('child_process');
const { syspath } = require('@config');
const { prettierFormat, CLI_ENV } = require('../utils');
const sequelizeConfig = require('@root/.sequelizerc');

module.exports = env => (command, options) => {
  // set `NODE_ENV` value for Sequelize CLI if targeted env does not exist
  if (!Object.values(CLI_ENV).includes(process.env.NODE_ENV)) {
    process.env.NODE_ENV = env;
  }

  const checkInfo = input => /help|version/.test(input);
  const commandInfo = checkInfo(command);
  const subCommandInfo = !commandInfo && options._[0] && checkInfo(options._[0]); // prettier-ignore
  let sequelize = `${syspath.root}/node_modules/.bin/sequelize`;

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
    console.info(cyan(`\nSequelize command: ${slash(sequelize)}`));

    if (err) {
      return console.error(red(`ERROR: ${err}`));
    }

    // prettier formatting generated model file
    if (/model:generate/.test(command)) {
      const filePath = `${sequelizeConfig['models-path']}/${options.name}.js`;
      prettierFormat(filePath);
    }

    return console.log(green(stdout));
  });
};
