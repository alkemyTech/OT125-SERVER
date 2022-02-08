const repository = require('../repositories/members');
const asyncWrapper = require('../utils/asyncWrapper');

let membersControllers={
  
      create:asyncWrapper(async (req, res, next) => {
        const body = { name: req.body.name, image: req.body.image }

        await repository.create(body, cb => {
          if (cb.message) {
            res
            .status(errJSON.statusCode)
            .json({ errors: [{ msg: errJSON.message }] });
          } else {
            res.json(cb)
          }
        })

      });
  
      //Get all activities
      findAll:asyncWrapper(async (req, res) => {
        repository.getAll()
          .then(result =>res.json(result))
          .catch(err=>res.status(500).json(err));

      });
  
      edit:function(req,res,next){
        res.send('Members get  editions');
      },
  
      update:function(req,res,next){
        res.send('Members update');
      },
  
      destroy:function(req,res,next){
        res.send('Members deleted');
      },
};

module.exports = membersControllers;
