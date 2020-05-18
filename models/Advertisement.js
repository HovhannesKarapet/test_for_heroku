const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('advertisements', advertisementsSchema);
