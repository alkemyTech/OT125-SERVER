const { body} = require('express-validator');
const errHandler = require('./errorFilter');

module.exports.contactValidation = [
    body('name').notEmpty().withMessage(`Name can't be empty`).isString().withMessage('Must be a String'),
    body('email').isEmail().normalizeEmail(),
    body('message').notEmpty().withMessage(`Message can't be empty`).isString().withMessage('Must be a String'),
    body('phone').notEmpty().withMessage(`Phone can't be empty`).isInt().withMessage('Only numbers'),
    errHandler
];