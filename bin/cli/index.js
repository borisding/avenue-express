#!/usr/bin/env node

import sade from 'sade';
import pkg from '@root/package';
import { createController, createModel, createKey } from './lib';

const program = sade('avenue');

program.version(pkg.version);

program
  .command('new:controller <controller>')
  .describe('Create new resource controller with corresponding router.')
  .option('-b, --bare', 'Create minimal controller file as entry.', false)
  .option(
    '-f, --force',
    'Force writing new controller file. This will replace existing controller file.',
    false
  )
  .option(
    '-p, --path',
    'Specify router path for generated controller. Default is using controller name (lowercase and pluralized).'
  )
  .option(
    '-m, --module',
    "Name of sub-folder that controller resides in `controllers` folder. Default is controller's base folder.",
    '.'
  )
  .action(createController);

program
  .command('new:model <model>')
  .describe('Create new model class in `models` folder.')
  .option('-i, --id', 'Specify column identifier.', 'id')
  .option(
    '-f, --force',
    'Force writing new model file. This will replace existing model file.',
    false
  )
  .option(
    '-t, --table',
    'Name of `table` for the model. Default is using model class name (lowercase and pluralized).',
    null
  )
  .option(
    '-m, --module',
    "Name of sub-folder that model resides in `models` folder. Default is model's base folder.",
    '.'
  )
  .action(createModel);

program
  .command('new:key')
  .describe('Generate new random key for application.')
  .option('-l, --length', 'Specify maximum length of generated random key.', 32)
  .action(createKey);

program.parse(process.argv);
