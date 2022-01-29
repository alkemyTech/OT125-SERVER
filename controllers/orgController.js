const repo = require('../repositories/organization');


exports.orgGet = function(req,res) {
    res.send('NOT IMPLEMENTED: Organization create');
};

exports.orgGetOne = async function(req,res) {
    const data = await repo.getOneOrg(req.params.id);
    res.json(data);
};

exports.orgCreate = function(req,res) {
    res.send('NOT IMPLEMENTED: Organization create')
};

exports.orgUpdate = function(req,res) {
    res.send('NOT IMPLEMENTED: Organization update')
};

exports.orgDelete = function(req,res) {
    res.send('NOT IMPLEMENTED: Organization delete')
};


