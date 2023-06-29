const db = require('mysql2/promise');

const connection = db.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = connection;