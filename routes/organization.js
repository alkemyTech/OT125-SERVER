const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');
const repo = require('../repositories/organization');


router.get('/', controller.orgGet);

router.get('/public/:id', controller.orgGetOne, repo.getOneOrg);

router.post('/', controller.orgUpdate);

router.delete('/:id', controller.orgDelete);

router.patch('/:id', controller.orgUpdate);


module.exports = router;