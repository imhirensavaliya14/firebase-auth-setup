// db.js
const { Pool } = require('pg');
require('dotenv').config(); // To load environment variables

// Create a connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 25060,
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if connection takes more than 2 seconds
  ssl: {
    rejectUnauthorized: false // This disables certificate validation; set to true if using a valid certificate
  }
});


// Export the query method to use globally
module.exports = {
  query: (text, params) => pool.query(text, params),
};
