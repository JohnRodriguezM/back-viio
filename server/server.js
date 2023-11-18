//* conexion a la base de datos
const connectDb = require("./src/models/database");
const handleError = require("./src/controllers/handleErrors/handleErrors");
const app = require("./index");

//* I'll imports routes here

const logueo = require("./src/routes/login/login");
const productsRoutes = require("./src/routes/products/products");

//* I'll use routes here
app.use("/api", logueo);
app.use("/api", productsRoutes);

//* I'll handle errors here

app.use(handleError);

/*connectDb().then((connection) => {
  console.log("Connected to MySQL server");
  connection
    .query("SELECT * FROM USERS")
    .then(([results, fields]) => {
      console.log(results);
      console.log(fields);
    })
    .catch((err) => console.error(err));
});
*/
