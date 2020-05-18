const Role = require('../models/Roles');


module.exports = {
    roleLimit: async (req, res, next) => {
        const roles = await Role.find();
        if(roles.length >= 3) return res.status(400).json('too much roles!');

        return next();
    },

    roleRules: (req, res, next) => {
        let count = 0;
        for(let key in req.body) {
            if(req.body[key] && req.body[key] === true) count++;
        }
        if(count !== 1) return res.status(400).json('something wrong with role!');

        return next();
    },
};
