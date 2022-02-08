const db = require('../models/index')
const responseParser = require('../utils/responseFormatter');

/**
 * fetchs to db a testimonial by its id
 * @param {int} id
 * @returns {Array<Promise.<Object>>} instance of db.Testimonial or Error
 */
module.exports.deleteTestimonial= async (ID)=>{
  
    let deleted= await db.Testimonial.destroy({
        where: {
          id: ID
        }
      }).then(dbResult => { return responseParser({ statusCode: 200, object: {message: 'Success'} })
     }).catch(SequelizeError => {
        return responseParser({error:errP(SequelizeError)})
     })
    
    return deleted;
  
}