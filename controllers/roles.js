const Role = require('../models/Roles');

module.exports = {

    getRoles: async (req, res) => {
        try {
            const roles = await Role.find();

            res.status(200).json(roles);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    createRole: async (req, res) => {
        try {
            const role = new Role({
                name: req.body.name,
                is_admin: req.body.is_admin,
                is_employee: req.body.is_employee,
                is_guest: req.body.is_guest
            });

            await role.save();

            res.status(201).json(role);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    updateRole: async (req, res) => {
        try {
            const update = {};

            for(let key in req.body) {
                if(req.body[key] || req.body[key] === 0) update[key] = req.body[key];
            }

            const role = await Role.findOneAndUpdate({_id: req.params.role_id}, update, {new: true});

            res.status(200).json(role);
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },

    removeRole: async (req, res) => {
        try {
            await Role.findByIdAndDelete(req.params.role_id);

            res.status(204).json('success!');
        } catch (e) {
            console.log(e);
            res.status(400).json('oops!')
        }
    },
};
