const Subscription = require('../models/user_susbcriptions');

exports.handleWebhook = async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'subscription.activated':
      await handleSubscriptionActivated(event.data);
      break;
    case 'subscription.canceled':
      await handleSubscriptionCanceled(event.data);
      break;
    // Add more cases as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.sendStatus(200);
};

async function handleSubscriptionActivated(data) {
  try {
    await Subscription.findOneAndUpdate(
      { fastspringId: data.subscription },
      { status: 'active', startDate: new Date(), nextBillingDate: new Date(data.nextPaymentDate) },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error handling subscription activation:', error);
  }
}

async function handleSubscriptionCanceled(data) {
  try {
    await Subscription.findOneAndUpdate(
      { fastspringId: data.subscription },
      { status: 'canceled' }
    );
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}