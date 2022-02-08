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
        repo.getCategory(req.params.id).then(({ statusCode, response }) => {
            res.status(statusCode).json(response)
        }).catch(err => {
            res.status(500).json({ error: err })
        })
    },

    updateCategory: (req, res) => {
      repo.updateCategory({
          category: req.body, id: req.params.id
      }).then(({ statusCode, response }) => {
        res.status(statusCode).json(response)
      }).catch(err => {
          res.status(500).json({ error: err })
      })
    },

    deleteCategory: (req, res) => {

    }

}