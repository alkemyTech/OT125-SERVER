const { body, param, validationResult } = require('express-validator')
const errHandler = require('./errorFilter')

module.exports.Vcreate = [
  body('name').notEmpty().withMessage(`name is required`).isString().withMessage('Field name only accepts strings'),
  body('image').isString().withMessage('Invalidate url, must be string'),
  body('facebookUrl').isString().withMessage('Invalidate url, must be string'),
  body('instagramUrl').isString().withMessage('Invalidate url, must be string'),
  body('linkedinUrl').isString().withMessage('Invalidate url, must be string'),
  errHandler

];

module.exports.validateId = [
  param('id').notEmpty().withMessage(`id is required`).isInt().withMessage(`must be integer`),
  errHandler

]

