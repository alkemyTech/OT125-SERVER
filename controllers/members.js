const db = require('../models/member');

let membersControllers={

    create:function(req, res, next) {
        res.send('Members-creation')
      },
    
      store:function(req,res,next){
        res.send('Members -reading');
      },
  
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