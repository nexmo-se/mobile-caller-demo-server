import { ConnectionStringParser } from 'connection-string-parser';
import Sequelize from 'sequelize';

import ModelGenerator from './models';

const useSsl = (process.env.DATABASE_USE_SSL || 'true') === 'true';
const useLogging = (process.env.DATABASE_USE_LOGGING || 'false') === 'true';

const connectionStringParser = new ConnectionStringParser({ scheme: 'postgres' });
const connectionString = process.env.DATABASE_URL;
const connectionObject = connectionStringParser.parse(connectionString);

// Template
const {
  username, password,
  endpoint: name,
  scheme: dialect,
} = connectionObject;
const { host, port } = connectionObject.hosts[0];

const config = {
  host,
  port,
  dialect,
  dialectOptions: {
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: useLogging,
};

const sequelizeClient = new Sequelize(name, username, password, config);
const models = ModelGenerator.getModels(sequelizeClient);

Object.keys(sequelizeClient.models)
  .forEach((m) => {
    const model = sequelizeClient.models[m];
    if (model.associate) {
      model.associate(models);
    }
  });

export default models;
