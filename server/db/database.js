

const mysql = require("mysql2/promise");

const connectDb = async () =>
  await mysql.createConnection(process.env.DATABASE_URL);

// simple query
/*connection.query("show tables", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra metadata about results, if available
});*/

// Example with placeholders
/*connection.query(
  "select 1 from dual where ? = ?",
  [1, 1],
  function (err, results) {
    console.log(results);
  }
);*/

module.exports = connectDb;

// connection.end();
