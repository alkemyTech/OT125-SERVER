const repository = require('../repositories/activities');
const asyncWrapper = require('../utils/asyncWrapper');


// Create
exports.create = asyncWrapper(async (req, res, next) => {
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }

  await repository.create(body, cb => {
    if (cb[1]) {
      res
        .status(cb[1].statusCode)
        .json({ errors: [{ msg: cb[1].message }] });
    } else {
      res.status(201).json(cb[0])
    }
  })

});

//Get all activities
exports.findAll = async (req, res) => {
  [result,err] = await repository.getone()
  if (err) {
    return res.json( err );
  } else {
    res.status(200).json(result)
  }
}

// Find one by ID
exports.findOne = async(req, res) => {
  [result,err] = await repository.getone(req.params.id)
  if (err) {
    return res.json( err );
  } else {
    res.status(200).json(result)
  }

};

// Update
exports.update = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id;
  const body = { name: req.body.name, content: req.body.content, image: req.body.image }
  await repository.setOne(_id, body, cb => {
    if (cb.message) {
      res
        .status(errJSON.statusCode)
        .json({ errors: [{ msg: errJSON.message }] });
    } else {
      res.json(cb)
    }
  })

});

// Delete
exports.delete = (req, res) => {

};