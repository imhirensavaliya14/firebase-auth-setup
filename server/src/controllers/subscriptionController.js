const Plan = require("../models/plans");
const User = require("../models/user");
const PayPalService = require("../services/paypalService");
const { errorResponse } = require("../utils/response");

exports.createSubscription = async (req, res, next) => {
    try {
        const { source, user_id } = req.body;

        if (source == "paypal") {
            const { plan_id } = req.body;
            const userDetails = await User.findByPk(user_id);
            if (!userDetails) {
                return errorResponse(res, 404, 'User not found');
            }
            const planDetails = await Plan.findOne({ where: { id: plan_id } });

            if (!planDetails) {
                return errorResponse(res, 404, 'Plan not found');
            }

            const response = await PayPalService.createSubscription(planDetails, userDetails)
            return successResponse(res, 'Subscription created successfully', {
                subscriptionId: response.result.id,
                approvalUrl
            });
        }
    } catch (error) {
        return errorResponse(res, 500, 'Failed to create subscription');
    }
};

// Other controller functions