import mongoose from 'mongoose';
import { ENV } from '@config';
import options from './options';

const dialects = ['mongodb'];
const connections = {};

export default class NoSql {
  static createConnection(dialect = 'mongodb') {
    return new NoSql(dialect);
  }

  constructor(dialect) {
    this.dialect = dialect;

    if (!dialects.includes(this.dialect)) {
      throw new TypeError(`Invalid NoSQL dialects. Supported: [${dialects}]`);
    }

    if (!Object.keys(options).includes(this.dialect)) {
      throw new Error(`No dialect option is set for '${this.dialect}'.`);
    }

    return this.create();
  }

  create() {
    if (!connections[this.dialect]) {
      connections[this.dialect] = mongoose.createConnection(
        ENV['MONGODB_URI'],
        options[this.dialect]
      );
    }

    return connections[this.dialect];
  }
}
