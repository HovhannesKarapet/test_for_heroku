const CategoryItems = require('../../models/Category-items');
const { body, validationResult } = require('express-validator');

module.exports = {

    categoryItemValidationRules: () => {
        return [
            body(['name.en', 'name.ru', 'name.am'])
                .exists().withMessage('name not exists')
                .isString().withMessage('type of name must be string')
                .custom(async (value) => {
                    return await CategoryItems.findOne({$or: [{'name.en': value}, {'name.ru': value}, {'name.am': value}]}).then(user => {
                        if(user) {
                            return Promise.reject('name already in use');
                        }
                    })
                }),
            body('price')
                .exists().withMessage('price not exists')
                .isNumeric().withMessage('type of price must be number'),
            body(['description.en', 'description.ru', 'description.am'])
                .exists().withMessage('description not exists')
                .isString().withMessage('type of description must be string'),
            body('category_id')
                .exists().withMessage('category_id not exists')
                // .isMongoId().withMessage('type of category_id must be mongoId')
        ]
    },

    categoryItemValidate: (req, res, next) => {
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
