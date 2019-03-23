const Joi = require('joi');

module.exports = {
    respondValidation: request => {
        const respondSchema = {
            response: Joi.string().required()
        }

        return Joi.validate(request, respondSchema)
    },
    applyValidation: request => {
        const applySchema = {
            name: Joi.string().required(),
            description: Joi.string().required(),   
        }

        return Joi.validate(request, submitSchema)
    }
};