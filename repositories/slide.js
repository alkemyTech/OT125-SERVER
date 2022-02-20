const db = require('../models/slide')
const { Slide } = require('../models/index')
const { handleError: errP } = require('../utils/errorHandler')
const responseParser = require('../utils/responseFormatter')
const awsS3Service = require('../services/aws_s3_service');

exports.create = async (body) => {
  try {
    const newSlide = await Slide.create({
      imageUrl: await awsS3Service.imageUpload(body.imageUrl, body.name),
      text: body.text,
      order: body.order,
      organizationId: body.organizationId
    });

    return responseParser({ statusCode: 201, object: newSlide });
  } catch (error) {
    return responseParser({ error: errP(error) });
  }
};

exports.findAll = async () => {
  try {
    const allSlide2 = await Slide.findAll({ attributes: ['imageUrl', 'order'] })
    return responseParser({statusCode:200,object:allSlide2})
  } catch (err) {
    return responseParser({ error: errP(err) });
  }

};

exports.findId = async function (req) {

  const oneSlide2 = await Slide.findOne({
    attributes: ['imageUrl', 'text', 'order', 'organizationId'],
    where: {
      id: req
    }
  })
    .then(dbResult => {
      if (!dbResult) {
        const err = new Error()
        err.name = 'not_found';
        err.entity = { name: 'slide', key: 'id', keyValue: req }
        return responseParser({ error: errP(err) })
      }
      return responseParser({ statusCode: 200, object: dbResult })
    }
    )
  return (oneSlide2)

},


  exports.update = async (req, body) => {

    try {
      let SlideOne2 = await Slide.findOne({
        where: {
          id: req
        }
      })

      if (!SlideOne2) {
        const err = new Error()
        err.name = 'not_found';
        err.entity = { name: 'slide', key: 'id', keyValue: req }
        return responseParser({ error: errP(err) })
      } else {
        const update = await SlideOne2.update({
          imageUrl: body.imageUrl,
          text: body.text,
          order: body.order,
          organizationId: body.organizationId

        });
        await update.save();
        return responseParser({ statusCode: 200, object: { message: 'Slide edited' } })
      }
    } catch (error) {
      return responseParser({ error: errP(error) })
    }
  }

exports.destroy = (req, res) => {

};