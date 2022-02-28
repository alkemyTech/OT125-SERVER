const repo = require('../repositories/organization');




exports.orgGetOne = async function(req,res) {
    const data = await repo.getOneOrg();
    res.json(data.response).status(data.statusCode);
};


exports.orgUpdate = async function(req,res) {
    const data = await repo.updateOrg(req.body);
    res.json(data.response).status(data.statusCode);
};



