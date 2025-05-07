require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
