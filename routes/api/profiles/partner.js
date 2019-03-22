const express = require('express');
const router = express.Router();


//Load Models
const Partner = require('../../../models/Partner');
const Organization = require('../../../models/Organization');
const User = require('../../../models/User');
const Application = require('../../../models/Application');
const Task = require('../../../models/Task');

// Load Validation
const validator = require('../../../validation/partnerValidation');



// @route   POST api/profiles/partner/:id
// @desc    Creates Partner Profile
// @access  Private
router.post('/:id', async (req,res)=>{
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) return res.status(404).send({error: 'Organization not found'})
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const fields = {};
        fields.fieldOfWork = req.body.fieldOfWork;
        fields.organization = req.params.id;

        const newPartner = await Partner.create(fields);
        res.json({msg:'Partner was created successfully', data: newPartner})
    }
    catch(error) {
        res.status(404).json({ organizationnotfound: 'Organization not found' });
    }
});


// @route   GET api/profiles/partner/:id
// @desc    Get Partner's profile by ID
// @access  private
router.get('/:id',async(req,res)=>{
    try {
        const partner = await Partner.findById(req.params.id).populate('organization');
        if (!partner) return res.status(404).send({error: 'Partner not found'})
        res.json({data: partner})
    }
    catch (error) {
        res.status(404).json({ partnernotfound: 'Partner not found' });
    }
});


// @route   PUT api/profiles/partner/:id
// @desc    Edit Partner's Profile
// @access  Private
router.put('/:id',async (req,res)=>{
    try {
        const id = req.body.id;
        const partner = await Partner.findOne({id});
        if(!partner) return res.status(404).send({error: 'Partner does not exist'});
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

        const fields = {};
        fields.fieldOfWork = req.body.fieldOfWork;

        const updatedPartner = await Partner.updateOne(fields);
        res.json({msg: 'Partner updated successfully',data: partner});
    }
    catch(error) {
        res.status(404).json({ partnernotfound: 'Partner not found' });
    }
});

// @route POST api/profiles/partner/board-members/add/:id
// @decs Adds Board Member To Partner's Profile
// @access private
router.post('/board-members/add/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
    const id = req.params.id;

    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
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
    partner.boardMembers.push(boardMember);
    return res.json(partner);
});


// @route POST api/profiles/partner/events/add/:id
// @decs Adds Event To Partner's Profile
// @access private
router.post('/events/add/:id',(req,res)=>{
    const eventName = req.body.eventName;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.params.id;

    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };

    if (!eventName) return res.status(400).send({ err: 'Event Name field is required' });
    if (!description) return res.status(400).send({ err: 'Event Description field is required' });

    const event = {
        eventName,
        description,
        date
    };
    partner.events.push(event);
    return res.json(partner);
});

// @route POST api/profiles/partner/partners/add/:id/:id2
// @decs Adds Partner to Partner's Profile
// @access private
router.post('/partners/add/:id/:id2',(req,res)=>{
    const id = req.params.id;
    const id2 = req.params.id2;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const partner2 = partners.find(element => {
        return element.id == id2;
    });
    if(!partner2){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const organization2 = organizations.find(element => {
        return element.id == id2;
    });
    if(!organization2){
        return res.status(400).json({ profile: 'There is no Organization profile for this user' });
    };
    const myPartner = {
        name: organization2.name,
        email: organization2.email,
        phone: organization2.phone,
        address: organization2.address,
    };
    partner.partners.push(myPartner);
    return res.json(partner);
});

// @route POST api/profiles/partner/past-projects/add/:id/:id2
// @decs Adds Past Project To Partner's Profile
// @access private
router.post('/past-projects/add/:id/:id2s',(req,res)=>{
    const partnerID = req.params.id;
    const taskID = req.params.id2;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const task = tasks.find(element => {
        return element.id == id;
    });
    if(!task){
        return res.status(400).json({ profile: 'There is no such Task' });
    };
    const application = applications.find(element => {
        return element.id == id;
    });
    if(!application){
        return res.status(400).json({ profile: 'There is no such Application' });
    };

    if(application.partner !== partner){
        return res.status(400).json({err: 'This Task is not Submitted by this Partner'});
    }
    partner.pastProjects.add(task);
});

// @route   DELETE api/profiles/partner/delete/:id
// @desc    Delete Partner's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    partners.splice( partners.indexOf(partner), 1 );
    if(!partner){
        return res.status(404).json({ profile: 'There is no Partner profile for this user' });
    }
    else{
        return res.json({data: partners});
    }
});

module.exports = router;
