// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
require('dotenv').config();
const subscriptionRoutes = require('../server/src/routes/subscriptionRoutes')
const fastSpringWebhook = require('../server/src/webhooks/fastspringWebhook')


// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// // Serve React for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});


// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client from pool', err.stack);
  } else {
    console.log('Database connected successfully');
    release(); 
  }
});

app.use(express.json());

// Routes
app.use('/api/subscriptions', subscriptionRoutes);
app.post('/fastspring-subscription-webhook', fastSpringWebhook.handleWebhook);
