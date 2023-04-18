const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "database-1.cufqccfdp1bo.ap-southeast-2.rds.amazonaws.com",
  database: "mydb",
  user: "master",
  password: "139726845",
});

module.exports = pool;
