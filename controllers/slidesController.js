const db = require('../models/slide')
const repo = require('../repositories/slide');
const { Slide } = require('../models/index')

let slidesController = {

  create: async function (req, res) {
    try {
      const data = await repo.create(req.body);
      res.json(data.response).status(data.statusCode)
    } catch (error) {
      res.json({ msg: error }).status(500)
    }
  },

  findAll: async function (req, res) {
    const { response, statusCode } = await repo.findAll();
    res.json(response).status(statusCode)
  },

  findId: async function (req, res) {

    const oneSlide = await repo.findId(req.params.id);
    res.send(oneSlide)

  },

  update: async function (req, res) {

    const oneSlide = await repo.update(req.params.id, req.body);
    res.send(oneSlide)

  },

  destroy: async function (req, res) {
    try {
      const slideFound = await repo.destroy(req.params.id);
      res.json(slideFound.response).status(slideFound.statusCode);
    } catch (error) {
      res.json({ error: error }).status(500);
    }

  }


};

module.exports = slidesController;