const { body, param, validationResult } = require('express-validator');
const db = require('../models');

const name = body('name')
  .exists()
  .withMessage('Param required')
  .notEmpty()
  .withMessage('Not empty')
  .isString()
  .withMessage('Must be a string');

const content = body('content')
  .exists()
  .withMessage('Param required')
  .notEmpty()
  .withMessage('Not empty')
  .isString()
  .withMessage('Must be a string');

const image = body('image')
  .exists()
  .withMessage('Param required')
  .notEmpty()
  .withMessage('Not empty')
  .isString()
  .withMessage('Must be a string');

const idParam = param('id')
  .exists()
  .withMessage('Param required')
  .isInt()
  .withMessage('Must be a integer')
  .custom(function (value) {
    return db.New.findOne({ where: { id: value } }).then((result) => {
      if (!result) {
        return Promise.reject(`Nonexistent id: ${value}`);
      }
    });
  });

const categoryId = body('categoryId').custom((value) => {
  if ((+value && value > 0) || !value) {
    return true;
  }
  throw new Error('Must be greater than 0');
});

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validatorCreate: [name, content, image, categoryId, validation],
  validatorRemove: [idParam, validation],
  validatorGetOne: [idParam, validation],
  validatorUpdate: [idParam, name, content, image, categoryId, validation],
};
