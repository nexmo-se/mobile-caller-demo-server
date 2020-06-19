const { ConnectionStringParser } = require('connection-string-parser');

const connectionStringParser = new ConnectionStringParser({ scheme: 'postgres' });
const connectionString = process.env.DATABASE_URL;
const connectionObject = connectionStringParser.parse(connectionString);

const useSsl = (process.env.DATABASE_USE_SSL || 'true') === 'true';

const {
  username, password,
  endpoint: database,
  scheme: dialect,
} = connectionObject;
const { host, port } = connectionObject.hosts[0];

// Template
const config = {
  database,
  username,
  password,
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
};


module.exports = {
  development: config,
  test: config,
  production: config,
};
