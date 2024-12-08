const mysql = require('mysql2/promise'); // Import the promise-based version of mysql2

require('dotenv').config();  // Load environment variables from .env file

// Database connection setup using environment variables
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export the pool object for use in other modules
module.exports = db;
