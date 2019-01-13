#!/usr/bin/env node

import sade from 'sade';
import pkg from '@root/package';
import * as actions from './lib';

const program = sade('avenue').version(pkg.version);

program
  .command('controller:new <controller>')
  .describe('Create new resource controller with corresponding router.')
  .option('-b, --bare', 'Create minimal controller file as entry.', false)
  .option(
    '-f, --force',
    'Force creating new controller file. This will replace existing controller file.',
    false
  )
  .option(
    '-m, --module',
    "Name of sub-folder that controller resides in `controllers` folder. Default is controller's base folder.",
    '.'
  )
  .option(
    '-s, --suffix',
    'Create new resource controller file with `Controller` suffix.',
    true
  )
  .action(actions.createController);

program
  .command('key')
  .describe('Generate new random key for application.')
  .option('-l, --length', 'Specify maximum length of generated random key.', 32)
  .action(actions.generateKey);

program
  .command('orm <command>')
  .describe('Running `sequelize-cli` under the hood in `development` mode.')
  .action(actions.sequelizeCli('development'));

program
  .command('orm:prod <command>')
  .describe('Running `sequelize-cli` under the hood in `production` mode.')
  .action(actions.sequelizeCli('production'));

program
  .command('orm:test <command>')
  .describe('Running `sequelize-cli` under the hood in `test` mode.')
  .action(actions.sequelizeCli('test'));

program.parse(process.argv);
