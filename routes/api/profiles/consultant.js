/*

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Consultant Model
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Consultant = require('../../../models/Consultant');
const Partner = require('../../../models/Partner');

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

const partners = [
    new Partner('Software Development', 1),
    new Partner('Civil Engineering', 2),
    new Partner('Graphic Design', 3),
    new Partner('Online Banking', 4),
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


// @route POST api/profiles/consultant/board-members/add/:id
// @decs Adds Board Member To Consultant's Profile
// @access private
router.post('/board-members/add/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
    const id = req.params.id;

    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!age) return res.status(400).send({ err: 'Age field is required' });
    if (!phone) return res.status(400).send({ err: 'Phone field is required' });
    if (!email) return res.status(400).send({ err: 'Email field is required' });


    const boardMember ={
        name,
        age,
        phone,
        email
    };
    consultant.boardMembers.push(boardMember);
    return res.json(consultant);
});


// @route POST api/profiles/consultant/events/add/:id
// @decs Adds Event To Consultant's Profile
// @access private
router.post('/events/add/:id',(req,res)=>{
    const eventName = req.body.eventName;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.params.id;

    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };

    if (!eventName) return res.status(400).send({ err: 'Event Name field is required' });
    if (!description) return res.status(400).send({ err: 'Event Description field is required' });

    const event = {
        eventName,
        description,
        date
    };
    consultant.events.push(event);
    return res.json(consultant);
});

// @route POST api/profiles/consultant/partners/add/:id/:id2
// @decs Adds Partner to Partner's Profile
// @access private
router.post('/partners/add/:id/:id2',(req,res)=>{
    const consultantID = req.params.id;
    const partnerID = req.params.id2;
    const consultant = consultants.find(element => {
        return element.id == consultantID;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    const partner = partners.find(element => {
        return element.id == partnerID;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const organization = organizations.find(element => {
        return element.id == partnerID;
    });
    if(!organization){
        return res.status(400).json({ profile: 'There is no Organization profile for this user' });
    };
    const myPartner = {
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        address: organization.address,
    };
    consultant.partners.push(myPartner);
    return res.json(consultant);
});


// @route POST api/profiles/consultant/reports/add/:id
// @decs Adds A Report To Consultant's Profiles
// @access private
router.post('/reports/add/:id',(req,res)=>{
    const report = req.body.report;
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    if (!report) return res.status(400).send({ err: 'Report field is required' });

    consultant.reports.push(report);
    return res.json(consultant);
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

*/