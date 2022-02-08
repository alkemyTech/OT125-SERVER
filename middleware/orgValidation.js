const { body, validationResult } = require('express-validator');

module.exports.updateValidation = [
    body('name').notEmpty().isString(),
    body('image').notEmpty().isString(),
    body('email').isEmail().normalizeEmail(),
    body('aboutUsText').notEmpty().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next()
        }
    }
];