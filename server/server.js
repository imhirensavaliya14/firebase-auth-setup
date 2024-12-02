// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');


const db = require('./db'); // Import the db.js file
const PORT = process.env.PORT || 5000;


// Define CORS options

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Remove trailing slashes
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Enable cookies and credentials
};

// Apply CORS with the specified options
app.use(cors(corsOptions));


// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(session({
  secret: 'fb-bulk--poster', // Change to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // Session expiration time in milliseconds
    sameSite: 'Lax' // Ensures cookies are sent only on same-site requests (adjust based on your use case)
  }
}));


app.get('/api/subscription', async (req, res) => {
  const { email } = req.query; // Get email or subscriptionId from query parameters

  try {
    if (!email) {
      return res.status(400).json({ 
        message: 'Please provide an email.',
        status:'success',
        subscription: false // Still return the query result
      });
    }

    let result;
    if (email) {
      // Query to fetch subscription details using the user's email
      result = await db.query('SELECT * FROM subscriptions WHERE email = $1', [email]);
    } else if (subscriptionId) {
      // Query to fetch subscription details using the subscription ID
      result = await db.query('SELECT * FROM subscriptions WHERE subscription_id = $1', [subscriptionId]);
    }

    if (result.rows.length === 0) {
      return res.status(200).json({ 
        message: 'No subscription found for the provided details.',
        subscription: false, // Still return the query result
        status:'success'
      });
    }

    // Send subscription details as the response
    return res.status(200).json({ 
      message: 'subscription found for the provided email.',
      status:'success',
      subscription: result.rows[0] // Still return the query result
    });
  } catch (error) {
    console.error('Error fetching subscription details:', error);
    return res.status(500).json({ 
      message: 'Error fetching subscription details',
      error:error,
      status:'error',
      subscription: false // Still return the query result
    });
  }
});


app.post('/thankyou', (req, res) => {
  const { CUSTOMER_NAME, CUSTOMER_EMAIL } = req.body;

  if (!CUSTOMER_NAME || !CUSTOMER_EMAIL) {
    return res.status(400).send('Invalid request. Missing customer details.');
  }

  // Optionally, you can log or store these details in a database
  console.log('Customer Name:', CUSTOMER_NAME);
  console.log('Customer Email:', CUSTOMER_EMAIL);

  // Redirect to the frontend thank you page with query parameters
  res.redirect(`/thankyou?name=${encodeURIComponent(CUSTOMER_NAME)}&email=${encodeURIComponent(CUSTOMER_EMAIL)}`);
});

// Endpoint to store user email in session
app.post('/api/store-email', (req, res) => {
  const { email } = req.body;

  // Validate email format (optional)
  if (!email || typeof email !== 'string') {
    return res.status(400).send('Invalid email');
  }

  // Store the email in the session
  req.session.userEmail = email;
  res.send('User email stored in session: ' + req.session.userEmail);
});

// Example API route
app.get('/api/hello', async (req, res) => {
  const SUBSCRIPTION_ID = 5554554;

  try {
    // Perform database query
    const result = await db.query('SELECT * FROM subscriptions WHERE subscription_id = $1', [SUBSCRIPTION_ID]);

    console.log('Query result >>>> ', result.rows); // Adjusted to log the rows from the query result

    const userEmail = req.session?.userEmail; // Safely access session

    if (userEmail) {
      res.json({ 
        message: `Hello, ${userEmail} from server!`, 
        subscription: result.rows // Send query result back in response
      });
    } else {
      res.json({ 
        message: 'No email found in session',
        subscription: result.rows // Still return the query result
      });
    }
  } catch (error) {
    console.error('Error during query:', error); // Log the error

    // Send error response
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Serve React app for unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.post('/handleWebhook', async (req, res) => {
  const webhookData = req.body;
  const productPlans = {
      97636: 'monthly',
      97637: 'yearly',
      97726: 'free',
  };


  const {
    SUBSCRIPTION_ID,
    ORDER_STATUS,
    ORDER_ID,
    PAYMENT_METHOD_NAME,
    ORDER_CUSTOM_FIELDS,
    IPN_TYPE_NAME,
    PRODUCT_ID,
    CUSTOMER_EMAIL
  } = webhookData;

  console.log('Received webhook data:', webhookData);

  //const userEmail = "frc.smb95@gmail.com";

  function getUserEmailFromCustomFields(customFields) {
    if (!customFields) return null;
    const params = new URLSearchParams(customFields);
    return params.get('x-userEmail');
  }
  
  let userEmail = getUserEmailFromCustomFields(ORDER_CUSTOM_FIELDS);
  
  // Fallback to CUSTOMER_EMAIL if x-userEmail is not found in custom fields
  if (!userEmail) {
      userEmail = CUSTOMER_EMAIL;
  }

  if (!userEmail) {
    return res.status(400).send('Email not found in custom fields.');
  }

  let subscriptionStatus = '';

  try {
    if (IPN_TYPE_NAME === 'OrderCharged' || IPN_TYPE_NAME === 'SubscriptionChargeSucceed') {
      subscriptionStatus = 'active';
    } else if (IPN_TYPE_NAME === 'OrderDeclined' || IPN_TYPE_NAME === 'SubscriptionChargeFailed') {
      subscriptionStatus = 'canceled';
    } else if (IPN_TYPE_NAME === 'SubscriptionSuspended') {
      subscriptionStatus = 'suspended';
    } else if (IPN_TYPE_NAME === 'SubscriptionTerminated') {
      subscriptionStatus = 'canceled';
    }else if (IPN_TYPE_NAME === 'OrderRefunded') {
      subscriptionStatus = 'canceled';
    }

    console.log('subscriptionStatus:', subscriptionStatus);


    if (!subscriptionStatus) {
      return res.status(400).send('Invalid IPN_TYPE_NAME.');
    }

    const result = await db.query('SELECT * FROM subscriptions WHERE email = $1', [userEmail]);

    if (result.rows.length > 0) {
      await db.query(
        `UPDATE subscriptions 
         SET status = $1, 
             updated_at = NOW(), 
             payment_method = $2, 
             email = $3,
             subscription_id = $5,
             plan = $4  
         WHERE email = $3`,
        [subscriptionStatus, PAYMENT_METHOD_NAME, userEmail, productPlans[PRODUCT_ID], SUBSCRIPTION_ID]
      );

      console.log(`Subscription ${SUBSCRIPTION_ID} updated for customer ${userEmail}.`);
    } else {
      await db.query(
        `INSERT INTO subscriptions (subscription_id, email, status, created_at, plan, updated_at, payment_method)
         VALUES ($1, $2, $3, NOW(), $4, NOW(), $5)`,
        [SUBSCRIPTION_ID, userEmail, subscriptionStatus, productPlans[PRODUCT_ID], PAYMENT_METHOD_NAME]
      );

      console.log(`New subscription created for customer ${userEmail} with subscription ID ${SUBSCRIPTION_ID}.`);
    }

    res.status(200).send(`Webhook processed for customer ${userEmail} and Subscription ID: ${SUBSCRIPTION_ID}`);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
