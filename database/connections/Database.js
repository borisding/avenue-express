import { ENV } from '@config';

export default class Database {
  constructor(dialect, options) {
    this.dialect = dialect;
    this.dialects = this.getDialects();

    if (!this.dialects[dialect]) {
      throw new TypeError(
        `Invalid database dialects. Supported: [${Object.keys(this.dialects)}]`
      );
    }

    if (!options[this.dialect]) {
      throw new Error(`No dialect option is specified for '${this.dialect}'.`);
    }

    return this.create();
  }

  getDatabaseURI() {
    const DATABASE_URI = this.dialects[this.dialect];

    if (!ENV[DATABASE_URI]) {
      throw new Error(`${DATABASE_URI} is not specified.`);
    }

    return ENV[DATABASE_URI];
  }
}
