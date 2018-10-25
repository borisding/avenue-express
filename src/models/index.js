/**
 * NOTE:
 * This file is originally generated via sequelize migration cli.
 * Modified to serve as entry file for models.
 */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from '@database/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .map(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).map(
  modelName => db[modelName].associate && db[modelName].associate(db)
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
