const repo = require('../repositories/category')
const service = require('../services/categories')


module.exports = {
    createCategory: (req, res) => {
        repo.createCategory(req.body).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    getCategories: (req, res) => {
        service.getCategories(req.query.page).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    getCategory: (req, res) => {
        repo.getCategory(req.params.id).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    updateCategory: (req, res) => {

    },

    deleteCategory: (req, res) => {
        repo.deleteCategory(req.params.id).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    }

}