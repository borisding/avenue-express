#!/usr/bin/env node

import sade from 'sade';
import pkg from '@root/package';
import * as actions from './lib';

const program = sade('avenue');

program.version(pkg.version);

program
  .command('new:controller <controller>')
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
  .command('new:key')
  .describe('Generate new random key for application.')
  .option('-l, --length', 'Specify maximum length of generated random key.', 32)
  .action(actions.generateKey);

program
  .command('orm <command>')
  .describe('Database migration by utilizing `sequelize-cli` under the hood.')
  .action(actions.sequelizeCli);

program.parse(process.argv);
