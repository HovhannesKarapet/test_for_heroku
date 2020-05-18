const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('categories', categoriesSchema);
