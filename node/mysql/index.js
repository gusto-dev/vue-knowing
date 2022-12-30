const mysql = require('mysql');
const sql = require('./sql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'dev',
  password: '1234',
  database: 'dev',
  connectionLimit: 10,
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
