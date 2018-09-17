import Sequelize, { Op } from 'sequelize';
import extend from 'extend';
import { ENV } from '@config';
import options from './options';

const dialects = ['mysql', 'sqlite', 'postgres', 'mssql'];
const connections = {};

export default class Sql {
  static createConnection(dialect = 'mysql') {
    return new Sql(dialect);
  }

  constructor(dialect) {
    this.dialect = dialect;

    if (!dialects.includes(this.dialect)) {
      throw new TypeError(`Invalid SQL dialects. Supported: [${dialects}]`);
    }

    if (!Object.keys(options).includes(this.dialect)) {
      throw new Error(`No dialect option is set for '${this.dialect}'.`);
    }

    return this.create();
  }

  create() {
    // return established connection instance for targeted dialect, if any
    if (!(connections[this.dialect] instanceof Sequelize)) {
      connections[this.dialect] = new Sequelize(
        ENV['DATABASE_NAME'],
        ENV['DATABASE_USERNAME'],
        ENV['DATABASE_PASSWORD'],
        // to make sure passed in dialect always overwrites the one in options
        // also, assign `operatorsAliases` with Sequelize's built-in operators
        // @see: https://github.com/sequelize/sequelize/issues/8417
        extend(options[this.dialect], {
          dialect: this.dialect,
          operatorsAliases: Op
        })
      );
    }

    return connections[this.dialect];
  }
}
