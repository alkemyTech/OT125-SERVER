const db = require('../models/testimonial');
const testimonialRepository = require('../repositories/testimonial');


const { handleError } = require('../utils/errorHandler');

let testimonialsControllers={

    create:function(req, res, next) {
        res.send('Testimonials-creation');
      },

    store:function(req,res,next){
      res.send('Testimonials -reading');
    },

    edit:function(req,res,next){
      res.send('Testimonials get  editions');
    },

    update: async function(req,res,next){
      const data = await testimonialRepository.updateTestimonial(req.params.id,req.body);
      res.json(data);
      
    },

   

    destroy:function(req,res,next){

      const { id } = req.params;

      testimonialRepository.deleteTestimonial(id).then(({ statusCode, response }) => {
        res.status(statusCode).json(response);
      }).catch(err => {
        res.status(500).json({ error: err })
      });  
    }
 
};

module.exports = testimonialsControllers;