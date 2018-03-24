import random from 'random-key';
import chalk from 'chalk';

export default function createKey(options) {
  // fallback to 32 (default) if lesser than 8
  if (options.length < 8) {
    options.length = 32;
  }

  console.log(
    'Generated new key (%s): %s',
    options.length,
    chalk.cyanBright(random.generate(options.length))
  );
}
