const db = require('../models/testimonial');

let testimonialsControllers={

    create:function(req, res, next) {
        res.send('I am testimonials')
      }
 
};

module.exports = testimonialsControllers;