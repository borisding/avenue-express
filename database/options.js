import { ENV } from '@config';

// for more options of respective database dialects
// @see: http://docs.sequelizejs.com/manual/installation/usage.html#options
export default {
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
