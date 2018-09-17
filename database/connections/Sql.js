import extend from 'extend';
import Sequelize, { Op } from 'sequelize';
import Database from '@database/connections/Database';
import options from './options';

const connections = {};
const instances = {};

export default class Sql extends Database {
  constructor(dialect) {
    super(dialect, options);
  }

  static createConnection(dialect = 'mysql') {
    if (!instances[dialect]) {
      instances[dialect] = new Sql(dialect);
    }

    return instances[dialect];
  }

  getDialects() {
    return {
      mysql: 'MYSQL_URI',
      mssql: 'MSSQL_URI',
      postgres: 'POSTGRES_URI',
      sqlite: 'SQLITE_URI'
    };
  }

  create() {
    // return established connection instance for targeted dialect, if any
    if (!(connections[this.dialect] instanceof Sequelize)) {
      connections[this.dialect] = new Sequelize(
        super.getDatabaseURI(),
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
