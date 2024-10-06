
exports.createSubscription = async (req, res, next) => {
    try {
        const { source, user_id } = req.body;

        if(source == "paypal"){
            const { plan_id } = req.body;
            
        }
        console.log()
        res.status(201).json();
    } catch (error) {
        next(error);
    }
};

// Other controller functions