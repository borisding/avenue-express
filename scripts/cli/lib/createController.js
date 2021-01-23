const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const slash = require('slash');
const { green, red, yellow } = require('chalk');
const { syspath } = require('@utils');
const { prettierFormat } = require('./helper');

async function createController(controller, options) {
  try {
    const SUFFIX = 'Controller';
    const pathToControllers = slash(
      path.join(`${syspath.app}/controllers`, options.module)
    );

    let controllerFile = `${pathToControllers}/${controller.toLowerCase()}${SUFFIX}.js`;
    if (!options.suffix) {
      controllerFile = controllerFile.replace(SUFFIX, '');
    }

    await mkdirp(pathToControllers);
    if (fs.existsSync(controllerFile) && !options.force) {
      return console.warn(
        yellow(
          `(${controllerFile}) already exists. Use option --force to overwrite.`
        )
      );
    }

    const fileText = fs.readFileSync(
      `${syspath.scripts}/cli/templates/controller.${
        options.bare ? 'bare' : 'resource'
      }.txt`,
      'utf8'
    );

    prettierFormat(controllerFile, fileText, formattedText => {
      fs.writeFileSync(controllerFile, formattedText, { encoding: 'utf8' });
      console.log(green(`Generated controller: ${controllerFile}`));
    });
  } catch (err) {
    console.error(red(err));
  }
}

module.exports = createController;
