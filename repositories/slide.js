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
        order:body.order,
        organizationId:body.organizationId
      });
  
      return responseParser({ statusCode: 201, object: newSlide });
    } catch (error) {
      return responseParser({ error: errP(error) });
    }
  };

  exports.findAll = (req, res) => {
    const allSlide2 = Slide.findAll({attributes: ['imageUrl', 'text']})
    return(allSlide2) 
  };

exports.findId = async function (req) {
     
    const oneSlide2 = await Slide.findOne({
        attributes: ['imageUrl', 'text', 'order', 'organizationId' ],
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
      return(oneSlide2)  
    
  },
    

exports.update = (req, res) => {

};

exports.destroy = (req, res) => {

};