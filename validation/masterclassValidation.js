const Joi = require('joi');

module.exports = {
    respondValidation: request => {
        const respondSchema = {
            response: Joi.string().required()
        }

        return Joi.validate(request, respondSchema)
    },
};