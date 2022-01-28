const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');

router.get('/', controller.orgGet);

router.get('/:id', controller.orgGetOne);

router.post('/', controller.orgUpdate);

router.delete('/:id', controller.orgDelete);

router.patch('/:id', controller.orgUpdate);


module.exports = router;