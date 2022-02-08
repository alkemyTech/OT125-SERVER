const commentRepository = require('../repositories/comment');
const asyncWrapper = require('../utils/asyncWrapper');
const { handleError } = require('../utils/errorHandler');
/**
 * @route GET /users
 */
module.exports.getAll = asyncWrapper(async (req, res, next) => {
  const [result, err] = await commentRepository.getAll(req.query);
  if (err) {
    console.log(err);
    errJSON = handleError(err);
    return res
      .status(errJSON.statusCode)
      .json({ errors: [{ msg: errJSON.message }] });
  }

  res.json(result);
});
