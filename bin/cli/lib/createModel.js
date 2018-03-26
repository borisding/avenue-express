import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import mkdirp from 'mkdirp-promise';
import slash from 'slash';
import { print } from '@utils';
import { syspath } from '@config';

const fileExist = target => fs.existsSync(target);
const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);

export default async function createModel(model, options) {
  try {
    const pathToModels = slash(path.join(syspath.models, options.module));
    const modelName = upperFirst(model);
    const modelFile = `${pathToModels}/${modelName}.js`;
    const tableName = options.table
      ? options.table
      : pluralize(model.toLowerCase());

    await mkdirp(pathToModels);

    if (fileExist(modelFile) && !options.force) {
      return print.warn(
        `([${modelFile}] already exists. Use option --force to overwrite.)`
      );
    }

    const fileData = fs.readFileSync(
      `${syspath.bin}/cli/templates/model.txt`,
      'utf8'
    );

    fs.writeFileSync(
      modelFile,
      fileData
        .replace(/<model>/gi, modelName)
        .replace(/<table>/gi, tableName)
        .replace(/<id>/gi, options.id)
    );

    print.info('Generated model: %s', 0, [modelFile]);
  } catch (err) {
    print.error(err);
  }
}
