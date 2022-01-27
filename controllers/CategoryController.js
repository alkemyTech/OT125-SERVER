const repo = require('../repositories/category')


module.exports = {
    createCategory: (req, res) => {
        repo.createCategory(req.body).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    getCategories: (req, res) => {
        repo.getCategories().then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    getCategory: (req, res) => {

    },

    updateCategory: (req, res) => {

    },

    deleteCategory: (req, res) => {

    }

}