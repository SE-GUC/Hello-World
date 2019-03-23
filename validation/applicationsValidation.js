const Joi = require('joi');

module.exports = {
    submitValidation: request => {
        const submitSchema = {
            description: Joi.string().min(40).max(1000).required(),
            needConsultancy: Joi.boolean().required(),
            reviewed: Joi.boolean().required()
        }

        return Joi.validate(request, submitSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            description: Joi.string().min(40).max(1000).required(),
            needConsultancy: Joi.boolean().required(),
            reviewed: Joi.boolean().required()
        }

        return Joi.validate(request, updateSchema)
    },

    messageValidation: request => {
        const updateSchema = {
            status: Joi.string().valid('partner','admin').required(),
            name: Joi.string().min(3).max(40).required(),
            text: Joi.string().required()
        }

        return Joi.validate(request, updateSchema)
    },

};