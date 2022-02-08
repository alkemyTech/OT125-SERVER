const db = require('../models/slide');

let slidesController={

    create:function(req, res, next) {
        res.send('Slides')
      }
 
};

module.exports = slidesController;