import { ENV } from '@config';

export default {
  // for more about mongoose options
  // @see: https://mongoosejs.com/docs/connections.html#options
  mongodb: {
    useNewUrlParser: true,
    poolSize: 5
  },

  // for more about sequelize options
  // @see: http://docs.sequelizejs.com/manual/installation/usage.html#options
  mysql: {
    pool: {
      max: 5,
      min: 0
    }
  },

  sqlite: {
    // the storage engine for sqlite
    // - default ':memory:'
    storage: ENV['SQLITE_STORAGE']
  }
};
