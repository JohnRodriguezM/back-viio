require("dotenv").config();

//* conexion a la base de datos
const connectDb = require("./db/database")

connectDb().then((connection) => {
  console.log("Connected to MySQL server");
  connection.query("show tables")
    .then(([results, fields]) => {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra metadata about results, if available
    })
    .catch(err => console.error(err));
});




