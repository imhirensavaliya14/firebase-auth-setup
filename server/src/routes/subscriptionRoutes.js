const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create-subscription', subscriptionController.createSubscription);

// Other routes

module.exports = router;