const Joi = require('joi');

module.exports = {
    createValidation: request => {
        const createSchema = {
            fieldOfWork: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },
    updateValidation: request => {
        const updateSchema = {
            fieldOfWork: Joi.string().required()
        }

        return Joi.validate(request, updateSchema)
    }

};