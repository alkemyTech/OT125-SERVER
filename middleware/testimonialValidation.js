const { body, validationResult } = require('express-validator');
const errHandler = require('./errorFilter');

module.exports={
    createValidation :[
        body('name')
         .notEmpty()
         .withMessage('name is a required field')
         .isString()
         .withMessage('name must be a string'),
        body('content')
         .notEmpty()
         .withMessage('content is required field')
         .isString()
         .withMessage('content must be a string'),
        errHandler
    ],

    updateValidation: [
        body('name').custom((val) => {
          if (val === undefined) return true;
          if (val.trim() === '') throw new Error('empty name not allowed');
          return true;
        }),
        errHandler

    ]
} 