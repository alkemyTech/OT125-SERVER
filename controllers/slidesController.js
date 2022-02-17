const db = require('../models/slide')
const repo = require('../repositories/slide');
const { Slide } = require('../models/index')

let slidesController={

    create: async function (req, res) {
      try {
        const data = await repo.create(req.body);
        res.json(data.reponse).status(data.statusCode)
      } catch (error) {
        res.json({ msg: error }).status(500)
      }
    },

    findAll: async function(req, res) {
      const allSlide = await repo.findAll();
      res.send(allSlide)
    },

    findId: async function (req, res)  {
     
      const oneSlide = await repo.findId(req.params.id);
      res.send(oneSlide)  
      
    },

    update:function(req, res, next) {
        res.send('Slidesupdate, not implemented yet')
      },
    destroy:function(req, res, next) {
        res.send('Slidesdestroy, not implemented yet')
      }
    
 
};

module.exports = slidesController;