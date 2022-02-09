const db = require('../models/index');
const { handleError: errP } = require('../utils/errorHandler');
const responseParser = require('../utils/responseFormatter');


module.exports.deleteTestimonial = async (ID) => {

  const res = await db.Testimonial.findOne({ where: { id: ID } })
        .then(dbResult => {
            if (!dbResult) {
                const err = new Error()
                err.name = 'not_found';
                err.entity = { name: 'Testimonial', key: 'id', keyValue: ID }
                return responseParser({ error: errP(err) })
            } else {
                dbResult.destroy().then(deleted => deleted)
                return responseParser({ statusCode: 202, object: { deleteStatus: `Testimonial with id ${ID} deleted successfully.` } })
            }
        }
        ).catch(err => {
            return responseParser({ error: errP(err) })
        })

    return res;
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
