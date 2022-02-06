const { body,param,validationResult } = require('express-validator');
const errHandler = require('./errorFilter')

module.exports.create = [
  body('name').notEmpty().withMessage(`name is required`).isString().withMessage(`must be string`),
  body('content').notEmpty().withMessage(`content is required`).isString().withMessage(`must be string`),
  body('image').notEmpty().withMessage(`image is required`).isString().withMessage(`must be string`),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next()
    }
  }
];
module.exports.validateId = [
  param('id').notEmpty().withMessage(`id is required`).isNumeric().withMessage(`must be integer`),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next()
    }
  }
]
