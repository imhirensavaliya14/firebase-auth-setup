const Plan = require("../models/plans");
const User = require("../models/user");
const PayPalService = require("../services/paypalService");
const { errorResponse, successResponse } = require("../utils/response");

exports.createSubscription = async (req, res, next) => {
    try {
        const { source, user_id } = req.body;

        if (source == "paypal") {
            const { plan_id } = req.body;
            const userDetails = await User.findOne({
                where: { id: user_id }, 
                raw: true
            });

            if (!userDetails) {
                return errorResponse(res, 404, 'User not found');
            }
            const planDetails = await Plan.findOne({
                where: { paypal_plan_id: plan_id.trim() },
                raw: true // This ensures that only the data is returned, without the Sequelize metadata
            });

            console.log(planDetails)
            if (!planDetails) {
                return errorResponse(res, 404, 'Plan not found');
            }

            const response = await PayPalService.createSubscription(planDetails, userDetails)
            const approvalUrl = response.links.find(link => link.rel === 'approve').href;
console.log(response);
            return successResponse(res, 'Subscription created successfully', {
                subscriptionId: response.id,
                approvalUrl
            });
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, 'Failed to create subscription');
    }
};

// Other controller functions