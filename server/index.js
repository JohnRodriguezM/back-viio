// Importing necessary modules
const express = require("express"); // Express.js for building the server
const app = express(); // Creating an instance of Express
const morgan = require("morgan"); // Morgan for logging HTTP requests
const cors = require("cors"); // CORS for handling Cross-Origin Resource Sharing

// Setting the port for the server to listen on
// It will use the PORT environment variable if available, otherwise it defaults to 4000
app.set("port", process.env.PORT || 4000);

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Adding middleware to the Express app
app.use(morgan("dev")); // Using Morgan for logging HTTP requests in 'dev' format

// Using CORS with specific settings
// It allows requests from "http://localhost:4000" and all other origins
// It allows all HTTP methods
app.use(
  cors({
    origin: ["*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Using middleware to parse JSON bodies from HTTP requests
app.use(express.json());

// Using middleware to parse URL-encoded bodies from HTTP requests
// The 'extended: true' option allows parsing of nested objects
app.use(express.urlencoded({ extended: true }));

// Starting the server and listening on the specified port
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// Exporting the Express app to be used in other modules
module.exports = app;
