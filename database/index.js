import Sequelize, { Op } from 'sequelize';
import extend from 'extend';
import { ENV } from '@config';
import options from './options';

const DIALECTS = ['mysql', 'sqlite', 'postgres', 'mssql'];
const DEFAULT = 'mysql';
const SEQUELIZE = {};

export default class Database {
  static connect(dialect = DEFAULT) {
    if (!DIALECTS.includes(dialect)) {
      throw new TypeError(
        `Invalid database dialects. Supported: [${DIALECTS}]`
      );
    }

    if (!Object.keys(options).includes(dialect)) {
      throw new Error(`No dialect option is set for targeted '${dialect}'.`);
    }

    // return established connection instance for targeted dialect, if any
    if (SEQUELIZE[dialect] instanceof Sequelize) {
      return SEQUELIZE[dialect];
    }

    SEQUELIZE[dialect] = new Sequelize(
      ENV['DATABASE_NAME'],
      ENV['DATABASE_USERNAME'],
      ENV['DATABASE_PASSWORD'],
      // to make sure passed in dialect always overwrites the one in options
      // also, assign `operatorsAliases` with Sequelize's built-in operators
      // @see: https://github.com/sequelize/sequelize/issues/8417
      extend(options[dialect], { dialect, operatorsAliases: Op })
    );

    return SEQUELIZE[dialect];
  }
}
