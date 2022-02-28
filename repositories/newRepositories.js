const db = require('../models');

module.exports = {
  create: async (data) => {
    return await db.New.create(data);
  },
  getAll: async (offset, limit) => {
    return await db.New.findAndCountAll({offset, limit});
  },
  getOne: async (id) => {
    return await db.New.findByPk(id, {
      include: [{ association: 'category' }],
    });
  },
  update: async (id, data) => {
    return await db.New.update(data, { where: { id: id } });
  },
  remove: async (id) => {
    return await db.New.destroy({ where: { id: id } });
  },
  getComments: async function (id) {
    const news = await this.getOne(id);
    console.log(news);
    return await news?.getComments();
  },
};
