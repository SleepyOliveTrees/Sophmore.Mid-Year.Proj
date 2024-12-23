// Import the connection from db_connection.js
const db = require("./db_connection");

db.execute("SELECT * FROM user", (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Query results:", results);
  }
});

db.end();