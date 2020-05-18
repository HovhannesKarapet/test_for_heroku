const seeder = require('mongoose-seed');
const Roles = require('../models/Roles');
const Users = require('../models/Users');
const keys = require('../config/config');


seeder.connect(keys.mongoURL, async () => {
    seeder.loadModels([
        'models/Roles.js',
        'models/Users.js'
    ]);
    const roles = await Roles.find();
    const users = await Users.find();
    if (!roles.length) {
        seeder.populateModels(require('./roles').data(), async () => {
            const role = await Roles.findOne({is_admin: true});
            if (!users.length) seeder.populateModels(require('./users').data(role._id), () => {
                seeder.disconnect();
            });
        })
    } else seeder.disconnect();
});

module.exports = seeder;
