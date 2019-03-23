const Joi = require('joi');

module.exports = {
<<<<<<< HEAD
    boardmembersValidation: request => {
        const submitmemberSchema = {
            name: Joi.string().max(60).min(3).required(),
            age: Joi.number().max(100).min(1).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required()
        }

        return Joi.validate(request, submitmemberSchema)
    },
    eventValidation:request=>{
        const eventSchema ={
            title: Joi.string().required(),
            description: Joi.string().required(),
            date: Joi.date().required(),

        }
        return Joi.validate(request,eventSchema)
    },
    reportValidation:request=>{
        const reportSchema = {
            report:Joi.string().required()
        }
        return Joi.validate(request,reportSchema)
    },
    updateValidation:request=>{
        const updateSchema = {
            workPosition:Joi.string(),
            report:Joi.string()
        }
    return Joi.validate(request,updateSchema)
    }
}
=======


};
>>>>>>> origin/task
