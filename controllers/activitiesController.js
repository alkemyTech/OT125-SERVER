const repository = require('../repositories/activities');
const asyncWrapper = require('../utils/asyncWrapper');


// Create
exports.create = async (req, res, next) => {
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }

  await repository.create(body, cb => {
    if (cb[1]) {
      res
        .status(cb[1].statusCode).json(cb[1]);
    } else {
      res.status(201).json(cb[0])
    }
  })

};

//Get all activities
exports.findAll = async (req, res) => {
  [result, err] = await repository.getAll()
  if (err) {
    return res.status(err.statusCode).json(err);
  } else {
    res.status(200).json(result)
  }
}

// Find one by ID
exports.findOne = async (req, res) => {
  [result, err] = await repository.getOne(req.params.id)
  if (err) {
    return res.status(err.statusCode).json(err);
  } else {
    res.status(200).json(result)
  }

};

// Update
exports.update = async (req, res, next) => {
  const _id = req.params.id;
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }
  await repository.setOne(_id, body, cb => {
    if (cb[1]) {
      res.status(cb[1].statusCode).json(cb[1]);
    } else {
      res.json(cb[0]);
    }
  })

};

// Delete
exports.delete = async (req, res) => {
  [result, err] = await repository.delete(req.params.id);
  if (err) {
    res.status(err.statusCode).json(err)
  }
  res.status(result.statusCode).json(result)
}