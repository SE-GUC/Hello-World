const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            address: Joi.string().min(3).max(1000).required(),
            phone: Joi.number().required(),
            email: Joi.string()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500),
            address: Joi.string().min(3).max(1000),
            phone: Joi.number(),
            email: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
