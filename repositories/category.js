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
            return responseParser(errP('duplicatedEntry', { name: 'Category'}))
        }
        return responseParser({ statusCode: 201, object: dbResult[0], type: 'Category' })
    }).catch(SequelizeError => {
        return responseParser(errP('sequelize', { name: 'Category', pk: 'id' }, SequelizeError))
    })

    return result
}
