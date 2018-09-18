import mongoose from 'mongoose';
import Redis from 'ioredis';
import Database from '@database/connections/Database';
import options from './options';

const connections = {};
const instances = {};

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

  getConnection() {
    switch (this.dialect) {
      case 'redis':
        return new Redis(super.getDatabaseURI(), options[this.dialect]);

      default:
        return mongoose.createConnection(
          super.getDatabaseURI(),
          options[this.dialect]
        );
    }
  }

  create() {
    if (!connections[this.dialect]) {
      connections[this.dialect] = this.getConnection();
    }

    return connections[this.dialect];
  }
}
