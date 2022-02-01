const repository = require('../repositories/activities');
const { validationResult } = require('express-validator');
const asyncWrapper = require('../utils/asyncWrapper');


// Create
exports.create = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }

  await repository.create(body, cb => {
    if (cb.errMessage) {
      res
        .status(errJSON.statusCode)
        .json({ errors: [{ msg: errJSON.errMessage }] });
    } else {
      res.json(cb)
    }
  })

});

//Get all activities
exports.findAll = (req, res) => {

};

// Find one by ID
exports.findOne = (req, res) => {

};

// Update
exports.update = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const _id = req.params.id;
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }
  await repository.setOne(_id, body, cb => {
    if (cb.errMessage) {
      res
        .status(errJSON.statusCode)
        .json({ errors: [{ msg: errJSON.errMessage }] });
    } else {
      res.json(cb)
    }
  })

});

// Delete
exports.delete = (req, res) => {

};