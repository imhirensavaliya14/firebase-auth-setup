const fastspringService = require('../services/fastspringService');
const productPath = "test-firebase-product";

exports.createSubscription = async (req, res, next) => {
    try {
        const { user_id, card_number,  expiry_date, cvc} = req.body;
        console.log(user_id, card_number,  expiry_date, cvc,productPath)
        const result = await fastspringService.createSubscription(customerData, cardData, productPath);
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

// Other controller functions