const repo = require('../repositories/slide');

let slidesController={

    create:function(req, res, next) {
        res.send('Slidescreate, not implemented yet')
      },
    findAll:function(req, res, next) {
        res.send('SlidesfindAll, not implemented yet')
      },
    findId:function(req, res, next) {
      repo.findId();
      },
    update:function(req, res, next) {
        res.send('Slidesupdate, not implemented yet')
      },
    destroy:function(req, res, next) {
        res.send('Slidesdestroy, not implemented yet')
      }
    
 
};

module.exports = slidesController;