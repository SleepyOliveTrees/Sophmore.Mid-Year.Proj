const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Establish a connection with the database
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT),
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;