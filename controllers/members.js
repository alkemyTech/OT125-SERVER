const repository = require('../repositories/members');
const asyncWrapper = require('../utils/asyncWrapper');

let membersControllers = {
  create: asyncWrapper(async (req, res, next) => {
    const body = { 
      name: req.body.name,
      facebookUrl: req.body.facebookUrl,
      instagramUrl: req.body.instagramUrl,
      linkedinUrl: req.body.linkedinUrl,
      image: req.body.image,
      description: req.body.description
    };

    await repository.create(body, (cb) => {
      if (cb.message) {
        res
          .status(errJSON.statusCode)
          .json({ errors: [{ msg: errJSON.message }] });
      } else {
        res.json(cb);
      }
    });
  }),

  //Get all activities
  findAll: asyncWrapper(async (req, res) => {
    repository
      .getAll()
      .then(result => res.json(result))
      .catch((err) => res.status(500).json(err));
  }),

  edit: function (req, res, next) {
    res.send('Members get  editions');
  },

  findOne:async(req, res)=>{
    [result,err] = await repository.getOne(req.params.id)
    if (err) {
      return res.json( err );
    } else {
      res.status(200).json(result)
    }
  },

  update: async (req, res, next)=> {
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
        res
          .status(cb[1].statusCode)
          .json({ errors: [{ msg: cb[1].message }] });
      } else {
        res.json(cb[0])
      }
    })
  },

  destroy: async (req, res, next) =>{
    result = await repository.delete(req.params.id)
    res.json(result)
  },
};

module.exports = membersControllers;
