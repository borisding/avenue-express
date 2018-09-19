import { exec } from 'child_process';
import slash from 'slash';
import syspath from '@config/syspath';

export default function sequelizeCli(command, options) {
  let sequelize = `${syspath.root}/node_modules/.bin/sequelize`;
  let cliInfo = /help|version/.test(command);

  sequelize = `${sequelize} ${cliInfo ? '--' : ''}${command}`;

  delete options._;
  const opts = Object.keys(options)
    .map(opt => `--${opt} ${options[opt]}`)
    .join(' ');

  return exec(`${sequelize} ${opts}`, (err, stdout) => {
    console.info('\nExecuted command: ', slash(sequelize));

    if (err) {
      return console.error(`ERROR: ${err}`);
    }

    return console.info(stdout);
  });
}
