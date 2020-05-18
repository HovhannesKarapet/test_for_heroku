const Categories = require('../../models/Categories');
const {body, param, validationResult} = require('express-validator');

module.exports = {

    categoryValidationRules: () => {
        return [
            body(['name.en', 'name.ru', 'name.am'])
                .exists().withMessage('name not exists')
                .isString().withMessage('type of name must be string')
                .custom(async (value) => {
                    return await Categories.findOne({$or: [{'name.en': value}, {'name.ru': value}, {'name.am': value}]}).then(user => {
                        if (user) {
                            return Promise.reject(`${value} already in use`);
                        }
                    })
                })
        ]
    },

    categoryValidate: (req, res, next) => {
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
