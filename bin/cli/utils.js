const fs = require('fs');
const prettier = require('prettier');
const { syspath } = require('@config');

async function prettyFormat(key, options) {
  if (!options.name) return;
  try {
    const sequelizeConfig = require(`${syspath.root}/.sequelizerc`);
    if (sequelizeConfig[key]) {
      const filePath = `${sequelizeConfig[key]}/${options.name}.js`;
      const text = fs.readFileSync(filePath, 'utf8');

      const prettierOptions = await prettier.resolveConfig(filePath);
      const formatted = await prettier.format(text, {
        ...prettierOptions,
        parser: 'babel'
      });

      fs.writeFileSync(filePath, formatted, { encoding: 'utf8' });
    }
  } catch (error) {
    console.error(`Prettier failure: ${error}`);
  }
}

module.exports = {
  prettyFormat
};
