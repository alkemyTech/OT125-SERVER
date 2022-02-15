const { response } = require('express');
const repository = require('../repositories/members');
const asyncWrapper = require('../utils/asyncWrapper');

let membersControllers = {
  create: async (req, res) => {
    const body = { 
      name: req.body.name,
      facebookUrl: req.body.facebookUrl,
      instagramUrl: req.body.instagramUrl,
      linkedinUrl: req.body.linkedinUrl,
      image: req.body.image,
      description: req.body.description
    };

    await repository.create(body, cb => {
      if (cb[1]) {
        res.status(cb[1].statusCode).json(cb[1]);
      } else {
        res.json(cb[0]);
      }
    });
  },

  //Get all activities
  findAll: asyncWrapper(async (req, res) => {
    repository
      .getAll()
      .then(result => res.json(result))
      .catch((err) => res.status(500).json(err));
  }),

  findOne:async(req, res)=>{
    [result,err] = await repository.getOne(req.params.id)
    if (err) {
      return res.status(err.statusCode).json( err );
    } else {
      res.status(200).json(result)
    }
  },

  update: async (req, res)=> {
    const _id = req.params.id;
    const body = {
      name: req.body.name,
      facebookUrl: req.body.facebookUrl,
      instagramUrl: req.body.instagramUrl,
      linkedinUrl: req.body.linkedinUrl,
      image: req.body.image,
      description: req.body.description
    }
    await repository.setOne(_id, body, cb => {
      if (cb[1]) {
        res.status(cb[1].statusCode).json(cb[1]);
      } else {
        res.json(cb[0]);
      }
    })
  },

  destroy: async (req, res, next) =>{
    [result, err] = await repository.delete(req.params.id);
    if (err) {
      res.status(err.statusCode).json(err)
    }
    res.status(result.statusCode).json(result)

  }
};

module.exports = membersControllers;