const express = require('express');
const router = express.Router();
const controller = require('../controllers/activitiesController');
const validator = require('../middleware/activitiesValidator')

//GET
router.get('/', (req,res)=>{
  res.send('get to Activities working')
})
router.get('/:id');
//POST
router.post('/', validator.create,controller.create);
//PATCH
router.patch('/');
//DELETE
router.delete('/');


module.exports = router;