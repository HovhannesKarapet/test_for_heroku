const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    app_rate: {
        type: Number,
        required: true
    },
    cafe_service_rate: {
        type: Number,
        required: true
    },
    food_rate: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('rates', rateSchema);
