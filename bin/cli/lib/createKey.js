import random from 'random-key';
import { print } from '@utils';

export default function createKey(options) {
  // fallback to 32 (default) if lesser than 8
  if (options.length < 8) {
    options.length = 32;
  }

  print.info(`Generated new key (${options.length}):`);
  print.success(random.generate(options.length));
}
