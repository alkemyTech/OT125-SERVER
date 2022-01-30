const { Categories } = require('../models/index')
const { errorParser: errP } = require('../utils/errorHandler')
const responseParser = require('../utils/responseFormatter')


module.exports.createCategory = async (category) => {

    const result = Categories.findOrCreate({
        where: {
            name: category.name
        },
        defaults: {
            description: category.description,
            image: category.image
        }
    }).then(dbResult => {
        if (!dbResult[1]) {
            return responseParser(errP('duplicatedEntry', { name: 'Category' }))
        }
        return responseParser({ statusCode: 201, object: dbResult[0]})
    }).catch(SequelizeError => {
        return responseParser(errP('sequelize', { name: 'Category', pk: 'id' }, SequelizeError))
    })

    return result
}


module.exports.getCategories = async () => {

    /* Space for pagination in a few days */

    const res = await Categories.findAll({ attributes: ['id', 'name'] })
        .then(dbResult => { return { statusCode: 200, response: dbResult } })

    return res;
}


module.exports.getCategory = async (id) => {

    const res = await Categories.findOne({ where:{id:id}})
        .then(dbResult => { 
            if(!dbResult) return { statusCode:404, response:{error:`Category with id ${id} not found.`}}
            return { statusCode: 200, response: dbResult } })

    return res;
}
