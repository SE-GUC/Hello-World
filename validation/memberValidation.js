const Joi = require('joi');
module.exports = {
    submitValidation: request => {
        const submitSchema = {
            name: Joi.string().max(18).min(3).required(),
            age: Joi.number().max(2).min(1).required(),
            email: Joi.string().max(60).min(10).required(),
            phone: Joi.number().max(11).min(11).required()
        }

        return Joi.validate(request, submitSchema)
    },

 
        UpdateValidation: request => {
            const submitSchema = {
                name: Joi.string().max(18).min(3).required(),
                age: Joi.number().max(2).min(1).required(),
                email: Joi.string().max(60).min(10).required(),
                phone: Joi.number().max(11).min(11).required()
            }
    
            return Joi.validate(request, submitSchema)
        }}
        