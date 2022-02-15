const db = require('../models/slide')
const { Slide } = require('../models/index')
const { handleError: errP } = require('../utils/errorHandler')
const responseParser = require('../utils/responseFormatter')

exports.create = async (body) => {
    try {
      const newSlide = await Slide.create({
        imageUrl: body.imageUrl,
        text: body.text
        
      });
  
      return responseParser({ statusCode: 201, object: newSlide });
    } catch (error) {
      return responseParser({ error: errP(error) });
    }
  };

exports.findAll = (req, res) => {

};

exports.findId = async function (req) {
     
    const oneSlide2 = await Slide.findOne({
        attributes: ['imageUrl', 'text', 'order', 'organizationId' ],
        where: { 
          id: req
        }
    });
      return(oneSlide2)  
    
  },
    

exports.update = (req, res) => {

};

exports.destroy = (req, res) => {

};