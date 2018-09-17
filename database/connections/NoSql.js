import mongoose from 'mongoose';
import Database from '@database/connections/Database';
import options from './options';

let connections = {};
let instances = {};

export default class NoSql extends Database {
  constructor(dialect) {
    super(dialect, options);
  }

  static createConnection(dialect = 'mongodb') {
    if (!instances[dialect]) {
      instances[dialect] = new NoSql(dialect);
    }

    return instances[dialect];
  }

  getDialects() {
    return {
      mongodb: 'MONGODB_URI',
      redis: 'REDIS_URI'
    };
  }

  create() {
    switch (this.dialect) {
      case 'redis':
        // TODO: add redis client for connection
        break;
      default:
        if (!connections[this.dialect]) {
          connections[this.dialect] = mongoose.createConnection(
            super.getDatabaseURI(),
            options[this.dialect]
          );
        }
    }

    return connections[this.dialect];
  }
}
