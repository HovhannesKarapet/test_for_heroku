const User = require('../../models/Users');
const { body, validationResult } = require('express-validator');

module.exports = {

    userValidationRules: () => {
        return [
            body('login')
                .exists().withMessage('login not exists')
                .isString().withMessage('type of login must be string')
                .custom(async (value) => {
                    return await User.findOne({login: value}).then(user => {
                        if(user) {
                            return Promise.reject('login already in use');
                        }
                    })
                }),
            body('password')
                .exists().withMessage('is_admin not exists')
                .isString().withMessage('type of password must be string'),
            body('role')
                .exists().withMessage('role not exists')
                .isMongoId().withMessage('type of role must be mongoId')
        ]
    },

    userUpdateValidationRules: () => {
        return [
            body('login')
                .if(body('login').exists())
                .isString().withMessage('type of login must be string'),
            body('password')
                .if(body('password').exists())
                .isString().withMessage('type of password must be string'),
            body('role')
                .if(body('password').exists())
                .isMongoId().withMessage('type of role must be mongoId')
        ]
    },

    userValidate: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push(err.msg));

        return res.status(422).json({
            errors: extractedErrors,
        })
    }
};
