const repo = require('../repositories/role');
module.exports = (req, res, next) => {  
  //Case 1: without DB query
  /* if(req.currentUser.roleId === 1) next()
  else res.status(403).json({error:`Insufficient permissions.`}) */

  //Case 2: with DB query
  repo
    .getRoles('Admin')
    .then(([role, err]) => {
      if (req.currentUser.roleId === role.id) next();
      else res.status(403).json({ error: `Insufficient permissions.` });
    })
    .catch((err) => res.status(500).json(err));
};
