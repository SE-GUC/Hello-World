const express = require('express');
const router = express.Router();

//Load Models
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Consultant = require('../../../models/Consultant');
const Partner = require('../../../models/Partner');

// Load Validation
const validator = require('../../../validation/consultantValidation');


// @route   POST api/profiles/consultant/:id
// @desc    Creates Consultant Profile
// @access  Private
router.post('/:id',async (req,res)=>{
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) return res.status(404).send({error: 'Organization not found'});

        const fields = {};
        fields.organization = req.params.id;
        const newConsultant = await Consultant.create(fields);
        res.json({msg:'Consultant was created successfully', data: newConsultant})
    }
    catch(error) {
        res.status(404).json({ consultantnotfound: 'Consultant not found' });
    }
});


// @route   GET api/profiles/consultant/:id
// @desc    Get consultant's profile by ID
// @access  private
router.get('/:id',async (req,res)=>{
    try {
        const consultant = await Consultant.findById(req.params.id).populate('organization');
        if (!consultant) return res.status(404).send({error: 'Consultant not found'})
        res.json({data: consultant})
    }
    catch (error) {
        res.status(404).json({ consultantnotfound: 'Consultant not found' });
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

