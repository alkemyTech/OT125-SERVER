const { Activities } = require("../models/index");
const repository = require('../repositories/activities');

const { validationResult } = require('express-validator');
const asyncWrapper = require('../utils/asyncWrapper');
const { handleError } = require('../utils/errorHandler');

// Create
exports.create = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }

  const result = await repository.create(body)
  res.json( result )

});

//Get all activities
exports.findAll = (req, res) => {

};

// Find one by ID
exports.findOne = (req, res) => {

};

// Update
exports.update = (req, res) => {

};

// Delete
exports.delete = (req, res) => {

};