const { body, param, validationResult } = require('express-validator')
const errHandler = require('./errorFilter')

module.exports = {
  Vcreate: [
    body('name').notEmpty().withMessage(`name is required`)
      .isString().withMessage('Field name only accepts strings'),
    body('image').isString().withMessage('Invalidate url, must be string'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        next()
      }
    }
  ]
  ,
  VgetOne: [
    param('id').isInt().withMessage('Invalid id value. Only integers.')
      .notEmpty().withMessage('Id is required param.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        next()
      }
    }
  ]
}