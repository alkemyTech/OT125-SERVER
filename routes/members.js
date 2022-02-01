var express = require('express');
var router = express.Router();

const membersControllers= require('../controllers/members')


router.get('/', membersControllers.create);

router.post('/create',membersControllers.store);

router.get('/edit/:id', membersControllers.edit);

router.put('/edit/:id', membersControllers.update);

router.delete('/destroy/:id',membersControllers.destroy);



module.exports = router;