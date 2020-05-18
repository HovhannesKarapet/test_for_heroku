const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const usersSchema = new Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        loggedIn: {
            type: Boolean,
            required: true,
            default: false
        },
        reserved: {
            type: Boolean,
            default: false
        },
        role: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', usersSchema);
