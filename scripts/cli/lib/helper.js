const fs = require('fs');
const prettier = require('prettier');

const CLI_ENV = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test'
};

async function prettierFormat(filePath, fileText = null, callback = null) {
  if (!filePath) return;
  try {
    if (!fileText) fileText = fs.readFileSync(filePath, 'utf8');
    const prettierOptions = await prettier.resolveConfig(filePath);
    const formattedText = await prettier.format(fileText, {
      ...prettierOptions,
      parser: 'babel'
    });

    if (typeof callback === 'function') {
      callback(formattedText);
    } else {
      fs.writeFileSync(filePath, formattedText, { encoding: 'utf8' });
    }
  } catch (error) {
    console.error(`Prettier failure: ${error}`);
  }
}

module.exports = {
  CLI_ENV,
  prettierFormat
};
