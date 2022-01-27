/**
 * Takes an SequelizeError and returns a parsed version of it to be sent as response
 * @param {Error} error
 * @param {entity} entity entityObject, example: entity:{ name:"User", pk:"email" }
 * @returns {Object}
 */
module.exports.SequelizeErrorParser = (error, entity) => {
  let errResult;

  if (error.message === "Validation error" || error.name === 'SequelizeValidationError') {
    errResult = {
      statusCode: 400,
      message: error.errors[0].message
    }
  }else{
    switch (error.name) {
      case 'SequelizeForeignKeyConstraintError':
        errResult = {
          statusCode: 400,
          message: `One or more of the provided ids, doesn't corresponds to an ${entity.name}.`
        }
        break;

      case 'SequelizeUniqueConstraintError':
        errResult = {
          statusCode: 409,
          message: `Unique value duplicated on ${entity.name}.`
        }
        break;

      default:
        errResult = { statusCode: 500, message: 'internal_server_error' };
        break;
    }

  }

  
  return errResult;
};


/**
 * Takes an Error and returns a parsed version of it to be sent as response
 * @param {string} type string, example: "notFound"
 * @param {entity} entity entityObject, example: entity:{ name:"User", pk:"email" }
 * @param {errData} errData (optional) only valid in SequelizeErrors
 * @returns {response} responseObject: { error:{ message:"Something happen", statusCode:500 } }
 */
module.exports.errorParser = (type, entity, errData) => {

  let errResult;

  switch (type) {

    case 'sequelize':
      if (!errData) errResult = { message: 'Unexpected error.', statusCode: 500 }
      errResult = { error: this.SequelizeErrorParser(errData, entity) }
      break;

    case 'notFound':
      errResult = {
        message: `Not found ${entity.name} with ${entity.pk} provided.`,
        statusCode: 404
      }
      break;

    case 'duplicatedEntry': {
      errResult = {
        message: `The ${entity.name} already exists in DB.`,
        statusCode: 409
      }
    } break;

  }

  return { error: errResult }

}