const {Strategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/Users');
const keys = require('./config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret
};

module.exports = passport => {
    passport.use( 'jwt',
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({login: payload.login});

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
};
