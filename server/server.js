// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const subscriptionRoutes = require('../server/src/routes/subscriptionRoutes')
const paypalWebhook = require('../server/src/webhooks/paypalWebhook')
const sequelize = require('./src/database');


// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Serve React for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


sequelize.sync();


app.use(express.json());

// Routes
app.use('/api/subscriptions', subscriptionRoutes);
app.post('/paypal-subscription-webhook', paypalWebhook.handleWebhook);
