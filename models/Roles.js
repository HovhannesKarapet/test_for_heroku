const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    },
    is_employee: {
        type: Boolean,
        required: true,
        default: false
    },
    is_guest: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('roles', rolesSchema);
