const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Education Model
const Education = require('../../../models/Education');

// Temporary Data
const educations = [
    new Education('Education 1', 80, 1),
    new Education('Education 2', 90, 2),
    new Education('Education 3', 100, 3),
    new Education('Education 4', 110, 4),
    new Education('Education 5', 123, 5),
];


// @route   GET api/profiles/education/all
// @desc    Gets All Education Profiles
// @access  Public
router.get('/all', (req,res)=>{
    res.json({data: educations});
});


// @route   POST api/profiles/education/create
// @desc    Creates Educations Profile
// @access  Private
router.post('/create', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;


    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    if (!age) return res.status(400).send({ err: 'Age field is required' });
    if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });



    const newEducation = {
        name,
        age,
        id: uuid.v4()
    };
    educations.push(newEducation);
    return res.json({ data: newEducation });
})


// @route   GET api/profiles/education/:id
// @desc    Get education's profile by ID
// @access  Public
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        res.json({data: education});
    }

});


// @route   POST api/profiles/education/edit/:id
// @desc    Edit education's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        education.name = name;
        education.age = age;

        if (!name) return res.status(400).send({ err: 'Name field is required' });
        if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
        if (!age) return res.status(400).send({ err: 'Age field is required' });
        if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });


        return res.json({data: education});
    }

});


// @route   DELETE api/profiles/education/delete/:id
// @desc    Delete education's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    educations.splice( educations.indexOf(education), 1 );
    if(!education){
        return res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        return res.json({data: educations});
    }
});

module.exports = router;