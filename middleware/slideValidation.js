const { body, validationResult } = require('express-validator');

module.exports.createValidation = [
    body('imageUrl').notEmpty().isString(),
    body('text').notEmpty().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next()
        }
    }
];