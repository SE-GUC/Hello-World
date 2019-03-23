const Joi = require('joi');
module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().max(60).min(3).required(),
            age: Joi.number().max(100).min(1).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required()
        }

        return Joi.validate(request, createSchema)
    },

 
        UpdateValidation: request => {
            const updateSchema = {
                name: Joi.string().max(60).min(3),
                age: Joi.number().max(100).min(1),
                email: Joi.string().email(),
                phone: Joi.number()
            }
    
            return Joi.validate(request, updateSchema)
        },
        skillValidation: request => {
            const skillSchema = {
                skill: Joi.string().max(100)
            }
            return Joi.validate(request,skillSchema)
        },interestsValidation: request => {
            const interestSchema = {
                interest: Joi.string().max(100)
            }
            return Joi.validate(request,interestSchema)},
            eventValidation:request=>{
                const eventSchema ={
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    date: Joi.date().required(),
                    location: Joi.string().required()
                }
                return Joi.validate(request,eventSchema)
            },
            certificatesValidation:request=>{
                const cerSchema ={
                    title:Joi.string().required(),
                    entity:Joi.string().required(),
                    date:Joi.date().required(),
                    description:Joi.string().required()
                }
                return Joi.validate(request,cerSchema)
            }
    };
        