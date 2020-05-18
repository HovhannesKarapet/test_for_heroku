const User = require('../models/Users');
const Role = require('../models/Roles');

const bcrypt = require('bcryptjs');

module.exports = {

    getUsersByRole: async (req, res) => {
        try {
            const users = await User.find({role: req.params.role_id}).select('-password');

            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    getGuests: async (req, res) => {
        try {
            const role = await Role.findOne({is_guest: true});
            const users_array = await User.find({role: role._id}).select('-password');
            let users = {};
            users_array.forEach(item => {
                users[item.login] = item;
            });

            res.status(200).json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    createUser: async (req, res) => {
        try {
            const salt = bcrypt.genSaltSync(12);
            const password = req.body.password;

            const user = await User.create({
                login: req.body.login,
                password: bcrypt.hashSync(password, salt),
                role: req.params.role_id
            });

            res.status(201).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    updateUser: async (req, res) => {
        try {
            const update = {};

            for(let key in req.body) {
                if(req.body[key] || req.body[key] === 0) update[key] = req.body[key];
            }

            if(req.body.password) {
                const salt = bcrypt.genSaltSync(12);
                const password = req.body.password;

                update.password = bcrypt.hashSync(password, salt);
            }

            const user = await User.findOneAndUpdate({_id: req.params.user_id}, update, {new: true}).select('-password');

            res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    removeUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.user_id);

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    reserve: async (req, res) => {
        try {
            console.log(req.body);
            await User.findByIdAndUpdate({_id: req.params.user_id}, {reserved: req.body.reserved});

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    }
};
