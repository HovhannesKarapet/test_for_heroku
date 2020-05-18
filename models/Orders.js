const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        comment: {
            type: String
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        total_price: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('orders', ordersSchema);
