

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Consultant Model
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Education = require('../../../models/Education');

// Load Validation
const validator = require('../../../validation/educationValidation');



// @route   POST api/profiles/education/:id
// @desc    Creates Educational Organization Profile
// @access  Private
router.post('/:id',async (req,res)=>{
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) return res.status(404).send({error: 'Organization not found'});

        const fields = {};
        fields.organization = req.params.id;
        const newEducation = await Education.create(fields);
        res.json({msg:'Education was created successfully', data: newEducation})
    }
    catch(error) {
        res.status(404).json({ educationnotfound: 'Education not found' });
    }
});


// @route   GET api/profiles/education/:id
// @desc    Gets educational organization's profile by ID
// @access  private
router.get('/:id',async(req,res)=>{
    try {
        const education = await Education.findById(req.params.id).populate('organization');
        if (!education) return res.status(404).send({error: 'Educational Organization not found'})
        res.json({data: education})
    }
    catch (error) {
        res.status(404).json({ educationnotfound: 'Education not found' });
    }

});


// @route POST api/profiles/education/courses/add/:id
// @decs Adds A Course To Educational Organization's Profile
// @access private
router.post('/courses/add/:id',(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const duration = req.body.duration;
    const price  = req.body.price;
    const educator = req.body.educator;
    const link  = req.body.link;

    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(400).json({ profile: 'There is no Educational Organization profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!description) return res.status(400).send({ err: 'Description field is required' });
    if (!duration) return res.status(400).send({ err: 'Duration field is required' });
    if (!price) return res.status(400).send({ err: 'Price field is required' });
    if (!educator) return res.status(400).send({ err: 'Educator field is required' });
    if (!link) return res.status(400).send({ err: 'Link field is required' });


    const course = {
        name,
        description,
        duration,
        price,
        educator,
        link
    };

    education.courses.push(course);
    return res.json(education);
});


// @route POST api/profiles/education/trainers/add/:id
// @decs Adds A Trainer To Educational Organization's Profile
// @access private
router.post('/trainers/add/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(400).json({ profile: 'There is no Educational Organization profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!age) return res.status(400).send({ err: 'Age field is required' });
    if (!phone) return res.status(400).send({ err: 'Phone field is required' });
    if (!email) return res.status(400).send({ err: 'Email field is required' });

    const trainer = {
        name,
        age,
        phone,
        email,
    };

    education.trainers.push(trainer);
    return res.json(education);
});


// @route POST api/profiles/education/certificates/add/:id
// @decs Adds Certificates To Educational Organization's Profile
// @access private
router.post('/certificates/add/:id',(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const id = req.params.id;

    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(400).json({ profile: 'There is no Education profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!description) return res.status(400).send({ err: 'Description field is required' });

    const certificate = {
        name,
        description
    };
    education.certificates.push(certificate);
    return res.json(education);
});


// @route POST api/profiles/education/training-programs/add/:id
// @decs Adds A Training Program To Educational Organization's Profile
// @access private
router.post('/training-programs/add/:id',(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const duration = req.body.duration;
    const price  = req.body.price;
    const trainer = req.body.trainer;
    const link  = req.body.link;

    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(400).json({ profile: 'There is no Educational Organization profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!description) return res.status(400).send({ err: 'Description field is required' });
    if (!duration) return res.status(400).send({ err: 'Duration field is required' });
    if (!price) return res.status(400).send({ err: 'Price field is required' });
    if (!trainer) return res.status(400).send({ err: 'Trainer field is required' });
    if (!link) return res.status(400).send({ err: 'Link field is required' });


    const trainingProgram = {
        name,
        description,
        duration,
        price,
        trainer,
        link
    };

    education.trainigPrograms.push(trainingProgram);
    return res.json(education);
});


// @route   DELETE api/profiles/education/delete/:id
// @desc    Delete education's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(404).json({ profile: 'There is no Educational Organization profile for this user' });
    }
    educations.splice( educations.indexOf(education), 1 );
    return res.json({data: educations});
});

module.exports = router;

