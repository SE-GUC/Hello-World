/*
const express = require('express');
const router = express.Router();
const uuid = require('uuid');


//Load Models
const Partner = require('../../../models/Partner');
const Organization = require('../../../models/Organization');
const User = require('../../../models/User');
const Application = require('../../../models/Application');
const Task = require('../../../models/Task');

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

const partners = [
    new Partner('Software Development', 1),
    new Partner('Civil Engineering', 2),
    new Partner('Graphic Design', 3),
    new Partner('Online Banking', 4),
];
const applications = [
    new Application('Freelancing Website',1,1,false),
    new Application('Online Hotel Booking Website',2,2,true),
    new Application('Cryptocurrency website',3,3,true),
];
const tasks = [
    new Task('High','Medium',['node','express','react'],1500,1),
    new Task('Medium','High',['java','unit testing'],1000,2),
    new Task('Low','Low',['HTML','CSS','Javascript'],500,3),
];

// @route   POST api/profiles/partner/create/:id
// @desc    Creates Partner Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const fieldOfWork = req.body.fieldOfWork;

    if (!fieldOfWork) return res.status(400).send({ err: 'Field Of Work field is required' });
    if (typeof fieldOfWork !== 'string') return res.status(400).send({ err: 'Invalid value for Field Of Work' });
    const organization = organizations.find(element => {
        return element.id == id;
    });
    if(!organization){
        return res.status(404).json({ profile: 'There is no Organization profile for this user' });
    }


    const newPartner = {
        fieldOfWork,
        id
    };
    partners.push(newPartner);
    return res.json({ data: newPartner });
});


// @route   GET api/profiles/partner/:id
// @desc    Get Partner's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(404).json({ profile: 'There is no Partner profile for this user' });
    }
    else{
        return res.json({data: partner});
    }

});


// @route   PUT api/profiles/partner/edit/:id
// @desc    Edit Partner's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const fieldOfWork = req.body.fieldOfWork;
    const id = req.params.id;

    if (!fieldOfWork) return res.status(400).send({ err: 'Field Of Work field is required' });
    if (typeof fieldOfWork !== 'string') return res.status(400).send({ err: 'Invalid value for Field Of Work' });

    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        partner.fieldOfWork = fieldOfWork;
        return res.json({data: partner});
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
*/