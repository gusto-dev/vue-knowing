const mysql = require('mysql');
const sql = require('./sql');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_LIMIT,
});

const query = async (alias, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql[alias], values, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

module.exports = {
  query,
};
