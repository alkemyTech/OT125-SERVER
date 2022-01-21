'use strict';
// Here will be placed all validation and sanitation for user related endpoints

const { body } = require('express-validator');

module.exports.register = [
  body('email').isEmail().normalizeEmail(),
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('password').notEmpty().isString(),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password not equal');
    }
    return true;
  }),
];

module.exports.login = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().isString(),
];
