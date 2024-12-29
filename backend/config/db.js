const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Establish a connection pool with the database
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Maximum number of connections
  queueLimit: 0, // Unlimited queuing
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000"),
};

const db = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the database");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = db;
