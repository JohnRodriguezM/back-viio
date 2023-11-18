const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// ! -- express settings

app.set("port", process.env.PORT || 3000);

// ! -- middlewares
require("dotenv").config();
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log(`Server on port ${app.get("port")}`);
});

module.exports = app;
