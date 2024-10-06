const { FastSpring } = require('@toolkitx/fastspring');
const fastspringConfig = require('../config/fastspring');
const fastspring = new FastSpring(fastspringConfig);


exports.createSubscription = async (customerData, cardData, productPath) => {
    try {
        // Create an order
        const order = await fastspring.orders.create({
            products: [{ product: productPath }],
            customer: customerData
        });

        // Add payment info to the order
        const updatedOrder = await fastspring.orders.update(order.id, {
            payment: {
                type: 'card',
                card: cardData
            }
        });

        // Process the payment
        const result = await fastspring.orders.process(updatedOrder.id);

        return result;
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }
};

exports.cancelSubscription = async (subscriptionId) => {
    try {
        const result = await fastspring.subscriptions.cancel(subscriptionId);
        return result;
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        throw error;
    }
};

exports.updateSubscription = async (subscriptionId, updateData) => {
    try {
        const result = await fastspring.subscriptions.update(subscriptionId, updateData);
        return result;
    } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }
};