#!/usr/bin/env node

import sade from 'sade';
import pkg from '@root/package';

const program = sade('avenue');

program.version(pkg.version);

program
  .command('new:controller <controller>')
  .describe(
    'Create new resource controller in `controllers` folder. Paired router will be created in `routers` folder by default.'
  )
  .option('-r, --router', 'Create new router for provided controller.', true)
  .option(
    '-m, --module',
    'Name of sub-folder that controller resides in `controllers` folder.'
  )
  .action((controller, options) => {
    console.log(controller);
    console.log(options);
  });

program
  .command('new:model <model>')
  .describe('Create new model class in `models` folder.')
  .action((model, options) => {
    console.log(model);
    console.log(options);
  });

program.parse(process.argv);
