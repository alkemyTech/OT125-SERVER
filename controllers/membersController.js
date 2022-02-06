const repository = require('../repositories/members');
const asyncWrapper = require('../utils/asyncWrapper');


// Create
exports.create = asyncWrapper(async (req, res, next) => {

  const body = { name: req.body.name, image: req.body.image }

  await repository.create(body, cb => {
    if (cb.message) {
      res
        .status(errJSON.statusCode)
        .json({ errors: [{ msg: errJSON.message }] });
    } else {
      res.json(cb)
    }
  })

});

//Get all activities
exports.findAll = asyncWrapper(async (req, res) => {
  let members = await repository.getAll()
  res.json(members)

});

// Find one by ID
exports.findOne = (req, res) => {

};

// Update
exports.update = (req, res, next) => {

};

// Delete
exports.delete = (req, res) => {

};