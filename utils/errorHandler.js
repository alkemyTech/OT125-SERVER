/**
 * Takes an SequelizeError and returns a parsed version of it to be sent as response
 * @param {Error} error
 * @param {entity} entity entityObject, example: entity:{ name:"User", pk:"email" }
 * @returns {Object}
 */
module.exports.SequelizeErrorParser = (error) => {
  let errResult;
  const { entity } = error;

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
 * @param {Error} error 
 * @returns {response} responseObject: { error:{ message:"Something happen", statusCode:500 } }
 */
module.exports.handleError = (error) => {

  let errResult;
  const {name,entity} = error

  switch (name) {    
    case 'not_found':
      errResult = {
        message: `${entity.name} with ${entity.key} ${entity.keyValue} doesn't exists.`,
        statusCode: 404
      }
      break;

    case 'duplicated_entry': {
      errResult = {
        message: `The ${entity.name} with ${entity.key} ${entity.keyValue} already exists in DB.`,
        statusCode: 409
      }
    } break;

    default:
      if(error.name.includes('Sequelize')){
      errResult = { error: this.SequelizeErrorParser(error) }
      break;
      }else{
        errResult = { message: 'Unexpected error.', statusCode: 500 }
      }
  }

  return { error: errResult }

}