const express = require('express');
const router = express.Router();
const controller = require('../controllers/orgController');
const repo = require('../repositories/organization');
const validation = require('../middleware/orgValidation');


router.get('/', controller.orgGet);

router.get('/public/:id', controller.orgGetOne, repo.getOneOrg);

router.post('/public/:id', validation.updateValidation,controller.orgUpdate, repo.updateOrg);

router.delete('/:id', controller.orgDelete);

router.patch('/:id', controller.orgUpdate);

module.exports = router;
