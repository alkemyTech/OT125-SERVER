const db = require('../models');

module.exports = {
    create: async(data) => {
        return await db.New.create(data)
    },
    getAll: async () => {
        return await db.New.findAll({include : [{association : 'category'}]})
    },
    getOne: async (id) => {
        return await db.New.findByPk(id, {include : [{association : 'category'}]})
    },
    update: async (id, data) => {
        return await db.New.update(data, {where: {id : id}})
    },
    remove: async (id) => {
        return await db.New.destroy({ where: {id : id}})
    }
}