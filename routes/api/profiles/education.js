const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Consultant Model
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Education = require('../../../models/Education');
// Validation
const validator = require('../../validation/EducationValidation');
// Temporary Data
// const users = [
//     new User('karim13','karimPassword',1),
//     new User('youssef12','youssefPassword',2),
//     new User('moataz11','moatazPassword',3),
//     new User('kashlan10','kashlanPassword',4),
// ];

// const organizations = [
//     new Organization('guc', 'El Tagamoo3 El Talet', 'guc@mail.com', 10, 1),
//     new Organization('auc', 'El Tagamo3 El Khames', 'auc@mail.com', 11, 2),
//     new Organization('miu', '3obor', 'miu@mail.com', 12, 3),
//     new Organization('aast', 'Sheraton', 'aast@mail.com', 13, 4),
// ];

// const educations = [
//     new Education(1),
//     new Education(2),
//     new Education(3),
// ];

// @route   POST api/profiles/education/create/:id
// @desc    Creates Educational Organization Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const education = education.findone(id)
    .then(education=>{
    if(!education) return res.status(400).json({profile: 'education Does Not Exist'});
    const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            educations.save()
    .then({msg:'Application was submitted successfully', data: newApp})
    .catch(err => res.json({error: 'Can not create user'}))
});
   


// @route   GET api/profiles/education/:id
// @desc    Get educational organization's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    // const education = educations.find(element => {
        // return element.id == id;
        education.findone(id)
        .then(education=>{
      res.json({data: education})
        })
        .catch(err => {res.status(404).json({ educationnotfound: 'There is no Educational Organization profile for this user' })})
    })
    
//     });
//     if(!education){
//         return res.status(404).json({ profile: 'There is no Educational Organization profile for this user' });
//     }
//     else{
//         return res.json({data: education});
//     }

// });


// @route   PUT api/profiles/education/edit/:id
// @desc    Edit educational organization's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const education = education.findone(id)
    .then(education=>{
    if(!education){
        return res.status(400).json({ profile: 'There is no education profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err: {res.status(404).json({ educationNotFound: 'education Not Found' })}})
        
    education.findOneAndUpdate(
            {education: req.params.id},
            {$set: education},
            {new: true})
            .then(education=>{
                return res.json({msg: 'updated',data: education})})
                .catch(err=>{err:{res.status(404).json({educationNotFound:'Could not find education'})}})
    
})
//     const education = educations.find(element => {
//         return element.id == id;
//     });
//     if(!education){
//         return res.status(404).json({ profile: 'There is no Education profile for this user' });
//     }
//     else{
//         return res.json({data: education});
//     }

// });


// @route POST api/profiles/education/courses/add/:id
// @decs Adds A Course To Educational Organization's Profile
// @access private
router.post('/courses/add/:id',(req,res)=>{
    // const name = req.body.name;
    // const description = req.body.description;
    // const duration = req.body.duration;
    // const price  = req.body.price;
    // const educator = req.body.educator;
    // const link  = req.body.link;
    const { name, description, duration, price,educator,link}  = req.body
    const id = req.params.id;
    const education1 = education.findone(id)
    .then(education=>{
    if(!education){
        return res.status(400).json({ profile: 'There is no education profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err: {res.status(404).json({ educationNotFound: 'education Not Found' })}})
    const Course = {
        name,
        description,
        duration,
        price,
        educator,
        link
    };
    education.Course.push(Course);
    return res.json(education);
});
    // const education = educations.find(element => {
    //     return element.id == id;
    // });
    // if(!education){
    //     return res.status(400).json({ profile: 'There is no Educational Organization profile for this user' });
    // };
    // if (!name) return res.status(400).send({ err: 'Name field is required' });
    // if (!description) return res.status(400).send({ err: 'Description field is required' });
    // if (!duration) return res.status(400).send({ err: 'Duration field is required' });
    // if (!price) return res.status(400).send({ err: 'Price field is required' });
    // if (!educator) return res.status(400).send({ err: 'Educator field is required' });
    // if (!link) return res.status(400).send({ err: 'Link field is required' });


//     const course = {
//         name,
//         description,
//         duration,
//         price,
//         educator,
//         link
//     };

//     education.courses.push(course);
//     return res.json(education);
// });


// @route POST api/profiles/education/trainers/add/:id
// @decs Adds A Trainer To Educational Organization's Profile
// @access private
router.post('/trainers/add/:id',(req,res)=>{
    // const name = req.body.name;
    // const age = req.body.age;
    // const phone = req.body.phone;
    // const email = req.body.email;
    const {name,age,phone,email} = req.body;
    const id = req.params.id;
    // const education = educations.find(element => {
    //     return element.id == id;
    // });
    // if(!education){
    //     return res.status(400).json({ profile: 'There is no Educational Organization profile for this user' });
    // };
    // if (!name) return res.status(400).send({ err: 'Name field is required' });
    // if (!age) return res.status(400).send({ err: 'Age field is required' });
    // if (!phone) return res.status(400).send({ err: 'Phone field is required' });
    // if (!email) return res.status(400).send({ err: 'Email field is required' });
    const education = education.findone(id)
    .then(education=>{
    if(!education){
        return res.status(400).json({ profile: 'There is no education profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:(res.status.json({Cannotfind:'education Not found'}))})
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
    // const name = req.body.name;
    // const description = req.body.description;
    const {name,description} = req.body;
    const id = req.params.id;
    const education = education.findone(id)
    .then(education=>{
    if(!education){
        return res.status(400).json({ profile: 'There is no education profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:(status(404).json({educationNotFound:'education Not Found'}))})
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
    // const name = req.body.name;
    // const description = req.body.description;
    // const duration = req.body.duration;
    // const price  = req.body.price;
    // const trainer = req.body.trainer;
    // const link  = req.body.link;
    const {name,description,duration,price,trainer,link} = req.body;
    const id = req.params.id;
    const education = education.findone(id)
    .then(education=>{
    if(!education){
        return res.status(400).json({ profile: 'There is no education profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:(status(404).json({educationNotFound:'education Not Found'}))})
    


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
    Member.findOneAndDelete({user:req.params.id})
        .then(education=>{
            if(!education){
                return res.status(404).json({ profile: 'There is no education profile for this user' });
            }        })
            
        return res.json({data:education});
    
});


module.exports = router;
