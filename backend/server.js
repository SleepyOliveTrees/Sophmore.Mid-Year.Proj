require("dotenv").config();


const db = require("./config/db");
const express = require("express");
const cors = require('cors');
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    console.log("Request Body: ", req.body);
    console.log("Request Query: ", req.query);
    next();
});

// routes
app.use("/api", taskRoutes);

app.use("/", async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    db: "unknown", // Default value
  };

  try {
    const connection = await db.getConnection();
    healthcheck.db = "connected"; // Update DB status
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    healthcheck.db = `error: ${err.message}`; // Include error message in the response
  }

  res.status(200).send(healthcheck);
});


// start the server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});