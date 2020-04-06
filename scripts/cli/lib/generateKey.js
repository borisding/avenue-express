const random = require('random-key');
const { green, yellow } = require('chalk');

function generateKey(options) {
  const BASE_LEN = 16;
  const DEFAULT_LEN = BASE_LEN * 2;
  const MIN_LEN = BASE_LEN;
  const MAX_LEN = BASE_LEN * BASE_LEN;

  if (options.length < MIN_LEN) {
    console.warn(
      yellow(
        `Expected min. string length is (${MIN_LEN}). Fallback to default (${DEFAULT_LEN})`
      )
    );
    options.length = DEFAULT_LEN;
  } else if (options.length > MAX_LEN) {
    console.warn(
      yellow(
        `Exceeded max. string length. Fallback to max. length (${MAX_LEN})`
      )
    );
    options.length = MAX_LEN;
  }

  console.log(green(`Generated new key (${options.length}):`));
  console.log(random.generate(options.length));
}

module.exports = generateKey;
