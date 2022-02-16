const { body,param,validationResult } = require('express-validator');
const errHandler = require('./errorFilter')

module.exports.create = [
  body('name').notEmpty().withMessage(`name is required`).isString().withMessage(`must be string`),
  body('content').notEmpty().withMessage(`content is required`).isString().withMessage(`must be string`),
  body('image').notEmpty().withMessage(`image is required`).isString().withMessage(`must be string`),
  errHandler

];
module.exports.validateId = [
  param('id').notEmpty().withMessage(`id is required`).isInt().withMessage(`must be integer`),
  errHandler

]
