import random from 'random-key';
import { print } from '@utils';

export default function generateKey(options) {
  const BASE_LEN = 16;
  const DEFAULT_LEN = BASE_LEN * 2;
  const MIN_LEN = BASE_LEN;
  const MAX_LEN = BASE_LEN * BASE_LEN;

  if (options.length < MIN_LEN) {
    print.warn(
      `Expected min. string length is (${MIN_LEN}). Fallback to default (${DEFAULT_LEN})`
    );

    options.length = DEFAULT_LEN;
  } else if (options.length > MAX_LEN) {
    print.warn(
      `Exceeded max. string length. Fallback to max. length (${MAX_LEN})`
    );

    options.length = MAX_LEN;
  }

  print.info(`Generated new key (${options.length}):`);
  print.success(random.generate(options.length));
}
