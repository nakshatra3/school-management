const mysql = require('mysql2/promise');
const url = require('url');

const connectionString = process.env.DATABASE_URL;

const dbConfig = (() => {
  if (connectionString) {
    const params = url.parse(connectionString);
    const [user, password] = params.auth.split(':');

    return {
      host: params.hostname,
      user: user,
      password: password,
      port: params.port,
      database: params.pathname.split('/')[1]
    };
  } else {
    // Fallback to individual env vars
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    };
  }
})();

const pool = mysql.createPool(dbConfig);

module.exports = pool;
