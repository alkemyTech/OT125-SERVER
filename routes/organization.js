const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');
const isAdminMIddleware=require('../Middleware/isAdmin');


router.get('/', controller.orgGet);

router.get('/:id',isAdminMIddleware, controller.orgGetOne);

router.post('/',isAdminMIddleware ,controller.orgUpdate);

router.delete('/:id',isAdminMIddleware ,controller.orgDelete);

router.patch('/:id', isAdminMIddleware, controller.orgUpdate);


module.exports = router;