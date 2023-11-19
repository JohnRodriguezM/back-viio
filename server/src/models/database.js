const mysql = require("mysql2/promise");

/**
 * Connects to the database.
 * @returns {Promise<mysql.Connection>} A promise that resolves to a MySQL connection object.
 */
const connectDb = async () =>
  await mysql.createConnection(process.env.DATABASE_URL);

module.exports = connectDb;
