const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryItemsSchema = new Schema(
    {
        name: {
            en: {
                type: String,
                required: true,
                unique: true
            },
            ru: {
                type: String,
                required: true,
                unique: true
            },
            am: {
                type: String,
                required: true,
                unique: true
            }
        },
        img: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            en: {
                type: String,
                required: true,
            },
            ru: {
                type: String,
                required: true,
            },
            am: {
                type: String,
                required: true,
            }
        },
        best_seller: {
            type: Boolean,
            required: true,
            default: false
        },
        category_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('category_items', categoryItemsSchema);
