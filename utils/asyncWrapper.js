const { handleError } = require('../utils/errorHandler');

// catches any unhandled exception
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      const error = handleError(err);
      res.status(error.statusCode).json({ errors: [{ msg: error.message }] });
    });
  };
};
