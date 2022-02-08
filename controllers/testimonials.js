const repo = require('../repositories/testimonials');


let testimonialsController = {
  create: async function (req, res) {
    try {
      const data = await repo.createTestimonial(req.body);
      res.json(data.reponse).status(data.statusCode)
    } catch (error) {
      res.json({ mssg: error }).status(500)
    }
  },

  store: function (req, res, next) {
    res.send('Testimonials -reading');
  },

  edit: function (req, res, next) {
    res.send('Testimonials get  editions');
  },

  update: function (req, res, next) {
    res.send('Testimonials update');
  },

  destroy: function (req, res, next) {
    res.send('Testimonials deleted');
  },
};

module.exports = testimonialsController;