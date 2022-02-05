const db = require('../models/testimonial');
const repo = require('../repositories/testimonials');
let testimonialsControllers = {

  create: async function (req, res) {
    try {
      const data = await repo.createTestimonial(req.body);
      res.json(data)
    } catch (error) {
      res.json({mssg: error}).status(500)
    }
  }
};

module.exports = testimonialsControllers;