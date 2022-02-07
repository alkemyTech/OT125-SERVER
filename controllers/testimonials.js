const db = require('../models/testimonial');

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

    update:function(req,res,next){
      res.send('Testimonials update');
    },

    destroy:function(req,res,next){
      res.send('Testimonials deleted');
    },

 
};

module.exports = testimonialsControllers;