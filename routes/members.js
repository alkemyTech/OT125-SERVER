var express = require('express');
var router = express.Router();

const membersControllers= require('../controllers/members');
const isAdminMIddleware=require('../Middleware/isAdmin');


router.get('/', membersControllers.create);

router.post('/create',isAdminMIddleware,membersControllers.store);

router.get('/edit/:id', membersControllers.edit);

router.put('/edit/:id',isAdminMIddleware,membersControllers.update);

router.delete('/destroy/:id',isAdminMIddleware,membersControllers.destroy);



module.exports = router;