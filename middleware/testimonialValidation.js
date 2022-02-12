const { body, validationResult } = require('express-validator');
const errHandler = require('./errorFilter');

module.exports={
    createValidation :[
        body('name').notEmpty().isString(),
        body('content').notEmpty().isString(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                next()
            }
        }
    ],

    updateValidation: [
        body('name').custom((val) => {
          if (val === undefined) return true;
          if (val.trim() === '') throw new Error('empty name not allowed');
          return true;
        }),
        errHandler,

    ]
} 