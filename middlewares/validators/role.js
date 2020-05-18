const { body, validationResult } = require('express-validator');

module.exports = {

    roleValidationRules: () => {
        return [
            body('name')
                .exists().withMessage('name not exists')
                .isString().withMessage('type of name must be string')
                .matches( /^[A-Za-z]+$/).withMessage('only letters is available'),
            body('is_admin')
                .exists().withMessage('is_admin not exists')
                .isBoolean().withMessage('type of is_admin must be boolean'),
            body('is_employee')
                .exists().withMessage('is_employee not exists')
                .isBoolean().withMessage('type of is_employee must be boolean'),
            body('is_guest')
                .exists().withMessage('is_guest not exists')
                .isBoolean().withMessage('type of is_guest must be boolean'),
        ]
    },

    roleValidate: (req, res, next) => {
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
