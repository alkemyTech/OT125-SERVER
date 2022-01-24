const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');


router.get('/', controller.orgGet);

router.post('/', controller.orgUpdate);

router.detele('/:id', controller.orgDelete);

router.patch('/:id', controller.orgUpdate);


module.exports = router;