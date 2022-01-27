const { body } = require('express-validator')
const errHandler = require('./errorFilter')

module.exports = {
    createCategory:
        [
            body('name').notEmpty().withMessage(`Name it isn't empty field`)
            .isString().withMessage('Field name only accepts strings'),
            errHandler
        ]
    
}