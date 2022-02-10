const commentRepository = require('../repositories/comment');
const asyncWrapper = require('../utils/asyncWrapper');
const { handleError } = require('../utils/errorHandler');

module.exports.getAll = asyncWrapper(async (req, res, next) => {
  const result = await commentRepository.getAll(req.query);
  res.json(result);
});

module.exports.delete = asyncWrapper(async (req, res, next) => {
  await commentRepository.delete(req.params.id);
  res.status(204).json();
});

module.exports.updateOne = asyncWrapper(async (req, res, next) => {
  const comment = await commentRepository.update(req.body, req.params.id);
  res.json(comment);
});

module.exports.create = asyncWrapper(async (req, res, next) => {
  const comment = await commentRepository.create(req.body);
  res.json(comment);
});
