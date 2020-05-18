const Rate = require('../models/Rate');

module.exports = {
    getAllRates: async (req, res) => {

    },

    rate: async (req, res) => {
        try {

            const rate = new Rate({
                app_rate: req.body.app_rate,
                cafe_service_rate: req.body.cafe_service_rate,
                food_rate: req.body.food_rate
            });

            await rate.save();

            res.status(201).json(rate);
        } catch (e) {
            console.log(e);
            res.status(400).json({errors: ["oops :("]})
        }
    }
};