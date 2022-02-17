'use strict';
// Here will be placed all validation and sanitation for user related endpoints

const { body } = require('express-validator');
const errHandler = require('./errorFilter');

module.exports.create = [
  body('body').notEmpty().isString(),
  body('postId').notEmpty().isInt(),
  body('userId').notEmpty().isInt(),
  errHandler,
];

module.exports.update = [body('body').notEmpty().isString(), errHandler];
