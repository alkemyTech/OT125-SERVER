const roleRepo = require('../repositories/role');
const db = require('../models/index');
const asyncWrapper = require('../utils/asyncWrapper');

module.exports = (entity) =>
  asyncWrapper(async (req, res, next) => {
    const result = await db[entity].findByPk(req.params.id);
    if (!result)
      return res.status(404).json({
        errors: [
          { msg: `element of ${entity} with id ${req.params.id} not found` },
        ],
      });

    const userId = entity === 'User' ? result.id : result.userId;
    if (
      userId === req.currentUser.id ||
      (await isAdmin(req.currentUser.roleId))
    )
      return next();
    res.status(403).json({ errors: [{ msg: 'unauthorized' }] });
  });

const isAdmin = (roleId) =>
  roleRepo.getRoles('Admin').then(([role, err]) => {
    return roleId === role.id;
  });
