const Joi = require('joi');
<<<<<<< HEAD

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(40).required(),
            phone: Joi.number().required(),
            email: Joi.string().email().required(),
            age: Joi.number().min(1).max(99).required(),
            skills: Joi.string().required(),
            interests: Joi.string(),
            avatar: Joi.string(),
            youtube: Joi.string().uri(),
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            linkedin: Joi.string().uri()
=======
module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().max(60).min(3).required(),
            age: Joi.number().max(100).min(1).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required()
>>>>>>> dfc52c7bc7d53c92f0163fcd9f82d43a7b1acf20
        }

        return Joi.validate(request, createSchema)
    },
<<<<<<< HEAD
    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(40),
            phone: Joi.number(),
            email: Joi.string().email(),
            age: Joi.number().min(1).max(99),
            avatar: Joi.string(),
            youtube: Joi.string().uri(),
            facebook: Joi.string().uri(),
            twitter: Joi.string().uri(),
            linkedin: Joi.string().uri()
        }

        return Joi.validate(request, updateSchema)
    },
    skillValidation: request => {
        const skillSchema = {
            skill: Joi.string().max(100)
        }
        return Joi.validate(request,skillSchema)
    },
    interestsValidation: request => {
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

};
=======

 
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
        
>>>>>>> dfc52c7bc7d53c92f0163fcd9f82d43a7b1acf20
