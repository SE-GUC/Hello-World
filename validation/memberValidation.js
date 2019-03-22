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
    }},

    module.exports = {
        UpdateValidation: request => {
            const submitSchema = {
                name: Joi.string().max(18).min(3).required(),
                age: Joi.number().max(2).min(1).required(),
                email: Joi.string().max(60).min(10).required(),
                phone: Joi.number().max(11).min(11).required()
            }
    
            return Joi.validate(request, submitSchema)
        }}
    /*
//creation
    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });

//edit
if (!name) return res.status(400).send({ err: 'name field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});
//skill add
if (!skill) return res.status(400).send({ err: 'Skill field is required' });
//adding interest
if (!interest) return res.status(400).send({ err: 'Interest field is required' });
//adding past events
if (!eventName) return res.status(400).send({ err: 'Event Name field is required' });
    if (!description) return res.status(400).send({ err: 'Event Description field is required' });
//Adds Certificates To Member's Profile
if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!date) return res.status(400).send({ err: 'Date field is required' });
    if (!entity) return res.status(400).send({ err: 'Entity field is required' });
    if (!description) return res.status(400).send({ err: 'Description field is required' });*/