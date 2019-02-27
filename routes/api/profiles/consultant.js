const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Consultant Model
const Consultant = require('../../../models/Consultant');

// Temporary Data
const consultants = [
    new Consultant('Consultant 1', 80, 1),
    new Consultant('Consultant 2', 90, 2),
    new Consultant('Consultant 3', 100, 3),
    new Consultant('Consultant 4', 110, 4),
    new Consultant('Consultant 5', 123, 5),
];


// @route   GET api/profiles/consultant/all
// @desc    Gets All Consultant Profiles
// @access  Public
router.get('/all', (req,res)=>{
    res.json({data: consultants});
});


// @route   POST api/profiles/consultant/create
// @desc    Creates Consultant Profile
// @access  Private
router.post('/create', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;

    const errors = {};


    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    if (!age) return res.status(400).send({ err: 'Age field is required' });
    if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });



    const newConsultant = {
        name,
        age,
        id: uuid.v4()
    };
    consultants.push(newConsultant);
    return res.json({ data: newConsultant });
})


// @route   GET api/profiles/consultant/:id
// @desc    Get consultant's profile by ID
// @access  Public
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        res.json({data: consultant});
    }

});


// @route   POST api/profiles/consultant/edit/:id
// @desc    Edit consultant's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        consultant.name = name;
        consultant.age = age;

        if (!name) return res.status(400).send({ err: 'Name field is required' });
        if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
        if (!age) return res.status(400).send({ err: 'Age field is required' });
        if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });


        return res.json({data: consultant});
    }

});


// @route   DELETE api/profiles/consultant/delete/:id
// @desc    Delete consultant's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    consultants.splice( consultants.indexOf(consultant), 1 );
    if(!consultant){
        return res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        return res.json({data: consultants});
    }
});

module.exports = router;