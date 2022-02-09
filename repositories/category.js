const db = require('../models/index')
const { Categories } = require('../models/index')
const { handleError: errP } = require('../utils/errorHandler')
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
            const err = new Error()
            err.name = 'duplicated_entry'
            err.entity = { name: 'Category', key: 'name', keyValue: dbResult[0].name }
            return responseParser({ error: errP(err) })
        }
        return responseParser({ statusCode: 201, object: dbResult[0] })
    }).catch(SequelizeError => {
        return responseParser({ error: errP(SequelizeError) })
    })

    return result
}


module.exports.getCategories = async ({ limit, offset }) => {

    const attr = ['id', 'name']
    const res = await Categories.findAndCountAll({ attributes: attr, limit, offset })
        .then(dbResult => dbResult)
    return res;
}


module.exports.getCategory = async (id) => {
    const attr = ['id', 'name', 'description', 'image', 'createdAt', 'updatedAt']
    const res = await Categories.findOne({ where: { id: id }, attributes: attr })
        .then(dbResult => {
            if (!dbResult) {
                const err = new Error()
                err.name = 'not_found';
                err.entity = { name: 'Category', key: 'id', keyValue: id }
                return responseParser({ error: errP(err) })
            }
            return responseParser({ statusCode: 200, object: dbResult })
        }
        )

    return res;
}

module.exports.updateCategory = async ({category, id}) => {
    let values = {}
    Object.keys(category).forEach(field => {
        values[field] = category[field]
    })

    const res = await Categories.findOne({ where: { id: id } })
        .then(dbResult => {
            if (!dbResult) {
                const err = new Error()
                err.name = 'not_found';
                err.entity = { name: 'Category', key: 'id', keyValue:id }
                return responseParser({error:errP(err)})
            }
            return dbResult.update(values)
            .then(result => responseParser({ statusCode: 200, object: result }))
            .catch(err => {
              console.log(err)
              return responseParser({error:errP(err)})
            })
        }
        )
    return res;
}


module.exports.deleteCategory = async (id) => {

    const res = await Categories.findOne({ where: { id: id } })
        .then(dbResult => {
            if (!dbResult) {
                const err = new Error()
                err.name = 'not_found';
                err.entity = { name: 'Category', key: 'id', keyValue: id }
                return responseParser({ error: errP(err) })
            } else {
                dbResult.destroy().then(deleted => deleted)
                return responseParser({ statusCode: 202, object: { deleteStatus: `Category with id ${id} deleted successfully.` } })
            }
        }
        ).catch(err => {
            return responseParser({ error: errP(err) })
        })

    return res;
}

