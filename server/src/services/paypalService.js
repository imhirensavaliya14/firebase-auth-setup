const paypal = require('@paypal/checkout-server-sdk');
const { errorResponse, successResponse } = require('../utils/response');
const axios = require('axios');

class PayPalService {
    static baseUrl = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for live
    static clientId = process.env.PAYPAL_CLIENT_ID;
    static secret = process.env.PAYPAL_CLIENT_SECRET;

    constructor() {
        this.paypalEnvironment = new paypal.core.SandboxEnvironment(PayPalService.clientId, PayPalService.secret);
        this.payPalClient = new paypal.core.PayPalHttpClient(this.paypalEnvironment);
        this.request = new paypal.orders.OrdersCreateRequest();
    }

    static async getAccessToken() {
        try {
            const response = await axios.post(`${PayPalService.baseUrl}/v1/oauth2/token`, 'grant_type=client_credentials', {
                auth: {
                    username: PayPalService.clientId,
                    password: PayPalService.secret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Failed to get access token', error);
            return null;
        }
    }

    static async createSubscription(planDetails, userDetails) {
        const accessToken = await this.getAccessToken();
        const planId = planDetails.paypal_plan_id; // Changed from planDetails.id to paypal_plan_id
        const userId = userDetails.id;
        const email = userDetails.email;
        console.log(planId)

        if (!accessToken) {
            throw new Error('Unable to retrieve PayPal access token');
        }

        if (!planId) {
            throw new Error('Invalid plan ID');
        }

        const firstName = userDetails.first_name;
        const lastName = userDetails.last_name;

        if (!firstName || !lastName || !email) {
            throw new Error('Invalid subscriber details');
        }
        console.log(accessToken,firstName,lastName,email);
        

        try {
            console.log(PayPalService.baseUrl)
            const response = await axios.post(`${PayPalService.baseUrl}/v1/billing/subscriptions`, {
                plan_id: planId.toUpperCase(),
                custom_id: userId,
                subscriber: {
                    name: {
                        given_name: firstName,
                        surname: lastName
                    },
                    email_address: email,
                },
                application_context: {
                    brand_name: 'FB-EXTENSION',
                    locale: 'en-US',
                    payment_method: {
                        payer_selected: 'PAYPAL',
                        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
                    },
                    user_action: 'SUBSCRIBE_NOW',
                    return_url: 'https://example.com/payment_successful/',
                    cancel_url: 'https://example.com/upgrade/'
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'PayPal-Request-Id': `SUBSCRIPTION-${userId}-${Date.now()}`,
                    'Prefer': 'return=representation'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to create subscription', error);
            // throw error; // Throw the error instead of returning null
        }
    }
}

module.exports = PayPalService;