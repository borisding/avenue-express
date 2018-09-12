// enable module aliases for config `require`
require('module-alias/register');

const fs = require('fs');
const slash = require('slash');
const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');
const SYSPATH = require('@config/syspath');

let pathToEnv = `${SYSPATH['config']}/.env`;

// using .env.example file instead if .env does not exist
if (!fs.existsSync(pathToEnv)) {
  pathToEnv = pathToEnv + '.example';
}

// load environment variable config `.env`
const env = dotenv.config({ path: pathToEnv });
const parsedEnv = dotenvParseVariables(env.parsed);
const targetConfigFile = 'env-properties.json';

// writing parsed environment variables into targeted env config filename
const writeEnvProperties = () => {
  try {
    let envProperties = JSON.stringify(parsedEnv, null, 2);

    fs.writeFileSync(
      `${SYSPATH['config']}/${targetConfigFile}`,
      envProperties,
      'utf8'
    );

    console.info(
      'Config file [%s] was written in location [%s]!',
      targetConfigFile,
      slash(SYSPATH['config'])
    );
  } catch (err) {
    console.error('Failed to write config file [%s]', targetConfigFile);
    console.error(err);
    process.exit(-1);
  }
};

writeEnvProperties();
