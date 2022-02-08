const { body, param, query } = require('express-validator');
const errHandler = require('./errorFilter');

module.exports = {
  createValidator: [
    body('name')
      .notEmpty()
      .withMessage(`Name it isn't empty field`)
      .isString()
      .withMessage('Field name only accepts strings'),
    errHandler,
  ],
  getOneValidator: [
    param('id')
      .isInt()
      .withMessage('Invalid id value. Only integers.')
      .notEmpty()
      .withMessage('Id is required param.'),
    errHandler,
  ],

  updateValidator: [
    body('name').custom((val) => {
      if (val === undefined) return true;
      if (val.trim() === '') throw new Error('empty description not allowed');
      return true;
    }),
    body('description').custom((val) => {
      if (val === undefined) return true;
      if (val.trim() === '') throw new Error('empty description not allowed');
      return true;
    }),
    errHandler,
  ],

  getAllValidator: [
    query('page')
      .optional()
      .isInt()
      .withMessage('Only numbers.')
      .customSanitizer((page) => {
        if (page <= 0) return 1;
        else return page;
      }),
    errHandler,
  ],
};
