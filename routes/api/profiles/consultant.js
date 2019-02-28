const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Consultant Model
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Consultant = require('../../../models/Consultant');

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

const consultants = [
    new Consultant(1),
    new Consultant(2),
    new Consultant(3),
];

// @route   POST api/profiles/consultant/create/:id
// @desc    Creates Consultant Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const organization = organizations.find(element => {
        return element.id == id;
    });
    if(!organization)   return res.status(404).json({ profile: 'There is no Organization profile for this user' });
    const newConsultant = {
        id
    };
    consultants.push(newConsultant);
    return res.json({ data: newConsultant });
});


// @route   GET api/profiles/consultant/:id
// @desc    Get consultant's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    else{
        return res.json({data: consultant});
    }

});


// @route   PUT api/profiles/consultant/edit/:id
// @desc    Edit consultant's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    else{
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
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    consultants.splice( consultants.indexOf(consultant), 1 );
        return res.json({data: consultants});
});

module.exports = router;