const db = require('../models/index');
const { handleError: errP } = require('../utils/errorHandler');
const responseParser = require('../utils/responseFormatter');


module.exports.deleteTestimonial = async (ID) => {

  let deleted = await db.Testimonial.destroy({
    where: {
      id: ID
    }
  }).then(dbResult => {
    return responseParser({ statusCode: 200, object: { message: 'Success' } })
  }).catch(SequelizeError => {
    return responseParser({ error: errP(SequelizeError) })
  })
  return deleted;
}

module.exports.updateTestimonial = async (id, body) => {
  try {
    let testimonialFound = await db.Testimonial.findOne({
      where: {
        id: id
      }
    })

    if (!testimonialFound) {
      return responseParser({ error: errP({ name: 'not_found', entity: { name: 'Testimonial', key: 'ID', keyvalue: id } }) })
    } else {
      const update = await testimonialFound.update({
        name: body.name,
        image: body.image,
        content: body.content

      });
      await update.save();
      return responseParser({ statusCode: 200, object: { message: 'Testimonial edited' } })
    }

  } catch (error) {
    console.error(error).status(500);
  }
}
