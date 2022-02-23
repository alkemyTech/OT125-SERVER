const repo = require('../repositories/testimonial');
const service = require('../services/testimonials')

const testimonialsController = {

  create: async function (req, res) {
    try {
      const data = await repo.createTestimonial(req.body);
      res.json(data.response).status(data.statusCode)
    } catch (error) {
      res.json({ msg: error }).status(500)
    }
  },

  getTestimonials: (req, res) => {
    service.getTestimonials(req.query.page).then(({ statusCode, response }) => {
        res.status(statusCode).json(response)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
  },

  update: async function (req, res, next) {
    const data = await repo.updateTestimonial(req.params.id, req.body);
    res.json(data.response).status(data.statusCode);

  },

  destroy: function (req, res, next) {
    const { id } = req.params;
    repo.deleteTestimonial(id).then(({ statusCode, response }) => {
      res.status(statusCode).json(response);
    }).catch(err => {
      res.status(500).json({ error: err })
    });
  }
}



module.exports = testimonialsController;