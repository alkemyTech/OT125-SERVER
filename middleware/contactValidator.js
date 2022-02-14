const { body, validationResult } = require('express-validator');


module.exports.contactValidation = [
    body('name').notEmpty().withMessage('Name cant be empty').isString().withMessage('Must be a String'),
    body('email').isEmail().normalizeEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next()
        }
    }
];