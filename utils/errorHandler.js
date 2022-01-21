/**
 * Takes an error and returns a parsed version of it to be sent as response
 * @param {Error} error
 * @returns {Object}
 */
module.exports.handleError = (error) => {
  let statusCode, errMessage;
  switch (error.name) {
    case 'not_found':
      if (error.message.includes('no user found with email')) {
        statusCode = 400;
      } else {
        statusCode = 404;
      }
      errMessage = error.message;
      break;

    case 'SequelizeForeignKeyConstraintError':
      (statusCode = 400),
        (errMessage =
          "one or more of the provided ids, doesn't corresponds to an entity on the DB");
      break;

    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      errMessage = 'unique value duplicated on entity';
      break;

    default:
      (statusCode = 500), (errMessage = 'internal_server_error');
      break;
  }
  return { statusCode, errMessage };
};
