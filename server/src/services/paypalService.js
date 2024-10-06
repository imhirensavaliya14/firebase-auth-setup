const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypalConfig');
const { errorResponse, successResponse } = require('../utils/response');

class PayPalService {
    static async createSubscription(planDetails, userDetails) {
        try {
            const payment = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                transactions: [
                    {
                        amount: {
                            total: '10.00', // Replace with your dynamic amount
                            currency: 'USD',
                        },
                        description: `Payment for Plan ID: ${plan_id}`,
                    },
                ],
                redirect_urls: {
                    return_url: "https://f9ad-2402-a00-405-d100-b431-b370-a385-824f.ngrok-free.app/success",
                    cancel_url: "https://f9ad-2402-a00-405-d100-b431-b370-a385-824f.ngrok-free.app/cancel"
                },
            };

            // Create PayPal payment link
            paypal.payment.create(payment, (error, payment) => {
                if (error) {
                    return errorResponse(res, 500, 'Failed to create subscription');
                }

                // Find the approval link to send in the response
                const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
                return successResponse(res, 'Payment link created successfully', {
                    paymentLink: approvalUrl,
                });
            
            })
            
        } catch (error) {
            console.error("Error creating subscription:", error);
            return errorResponse(res, 500, 'Failed to create subscription');
        }
    }
}

module.exports = PayPalService;
