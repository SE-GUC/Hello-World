const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Consultant Model
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Education = require('../../../models/Education');

// Temporary Data
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
];

const organizations = [
    new Organization('guc', 'El Tagamoo3 El Talet', 'guc@mail.com', 10, 1),
    new Organization('auc', 'El Tagamo3 El Khames', 'auc@mail.com', 11, 2),
    new Organization('miu', '3obor', 'miu@mail.com', 12, 3),
    new Organization('aast', 'Sheraton', 'aast@mail.com', 13, 4),
];

const educations = [
    new Education(1),
    new Education(2),
    new Education(3),
];

// @route   POST api/profiles/education/create/:id
// @desc    Creates Educational Organization Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const education= educations.find(element => {
        return element.id == id;
    });
    if(!education)   return res.status(404).json({ profile: 'There is no Educational Organization profile for this user' });
    const newEducation = {
        id
    };
    educations.push(newEducation);
    return res.json({ data: newEducation });
});


// @route   GET api/profiles/education/:id
// @desc    Get educational organization's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(404).json({ profile: 'There is no Educational Organization profile for this user' });
    }
    else{
        return res.json({data: education});
    }

});


// @route   PUT api/profiles/education/edit/:id
// @desc    Edit educational organization's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const education = educations.find(element => {
        return element.id == id;
    });
    if(!education){
        return res.status(404).json({ profile: 'There is no Education profile for this user' });
    }
    else{
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
    if(!education){
        return res.status(404).json({ profile: 'There is no Educational Organization profile for this user' });
    }
    educations.splice( educations.indexOf(education), 1 );
    return res.json({data: educations});
});

module.exports = router;