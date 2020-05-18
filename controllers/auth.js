const jwt = require('jsonwebtoken');
const keys = require('../config/config');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const Roles = require('../models/Roles');

module.exports = {
    login: async (req, res) => {
        let candidate = await Users.findOne({login: req.body.login});
        let role;

        if(candidate) {
            role = await Roles.findOne({_id: candidate.role});
            const password = bcrypt.compareSync(req.body.password, candidate.password);
            if(!password) return res.status(401).json({errors: 'Wrong password'});
            if(role.is_guest && candidate.loggedIn) return res.status(401).json({errors: 'User is already logged in'})
        } else {
            return res.status(401).json({errors: 'Wrong login'});
        }

        candidate = await Users.findOneAndUpdate({login: req.body.login}, {loggedIn: true, reserved: false}, {new: true}).select('-password');
        const token = jwt.sign({login: candidate.login}, keys.secret, {expiresIn: keys.tokenLife});
        const response = {
            "status": "Logged in",
            "token": token,
            "user": candidate
        };
        if(role.is_guest) global.io.emit('login', {user: candidate});
        res.status(200).json(response);
    },

    logoutWithPassword: async (req, res) => {

        let candidate = await Users.findOne({login: req.body.login});
        const role = await Roles.findOne({_id: candidate.role});

        if(candidate) {
            const password = bcrypt.compareSync(req.body.password, candidate.password);
            if(!password) return res.status(401).json({errors: 'Wrong password'});
        } else return res.status(401).json({errors: 'Wrong login'});

        candidate = await Users.findOneAndUpdate({login: req.body.login}, {loggedIn: false}, {new: true}).select('-password');

        if(role.is_guest) global.io.emit('logout', {user: candidate});
        res.status(200).json('logged out');
    },

    logoutWithoutPassword: async (req, res) => {
        const candidate = await Users.findOneAndUpdate({login: req.body.login}, {loggedIn: false}, {new: true}).select('-password');
        const role = await Roles.findOne({_id: candidate.role});


        if(role.is_guest) global.io.emit('logout', {user: candidate});
        res.status(200).json('looged out')
    },

    token: (req, res) => {
        // refresh the damn token
        const postData = req.body;
        // if refresh token exists
        if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            const user = {
                "login": postData.login,
            };
            const token = jwt.sign(user, keys.secret, { expiresIn: keys.tokenLife});
            const response = {
                "token": token,
            };
            // update the token in the list
            tokenList[postData.refreshToken].token = token;
            res.status(200).json(response);
        } else {
            res.status(404).send('Invalid request')
        }
    }
};
