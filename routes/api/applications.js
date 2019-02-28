const express = require('express');
const router = express.Router();
const uuid = require('uuid');


// Load Models
const Application = require('../../models/Application');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');


// Temporary Data
const applications = [
    new Application(55, 3, 1),
    new Application(65, 6, 2),
    new Application(75, 9, 3)
];

const partners = [
    new Partner('Karim Hisham', 45, 1),
    new Partner('Karem Hesham', 35, 2),
    new Partner('Kareem Hisham', 40, 3),
    new Partner('The Kareem Hisham', 21, 4),
    new Partner('The Karim Hisham', 90, 5),
];
const consultants = [
    new Consultant('Consultant 1', 80, 1),
    new Consultant('Consultant 2', 90, 2),
    new Consultant('Consultant 3', 100, 3),
    new Consultant('Consultant 4', 110, 4),
    new Consultant('Consultant 5', 123, 5),
];

// @route   GET api/applications/test
// @desc    Tests applications route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'applications works'});
});


// @route   POST api/applications/submit/:id
// @desc    Submits an Application of a task
// @access  Private
router.post('/submit/:id',(req,res)=>{
    const number = req.body.number;
    const id = req.params.id;
    if (!number) return res.status(400).send({ err: 'Application Number field is required' });
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner) return res.status(404).json({profile: 'There is no partner profile for this user'});
    else{
        const newApp = new Application(
            number,
            id,
            uuid.v4()
        );
        applications.push(newApp);
        return res.json({data: newApp});
    }
});

// @route   POST api/applications/negotiate/:id/:id2
// @desc    Submits an Application of a task
// @access  Private
router.post('/negotiate/:id/:id2',(req,res)=>{
    const text = req.body.text;
    const partnerID = req.params.id;
    const appID = req.params.id2;
    const partner = partners.find(element => {
        return element.id == partnerID;
    });
    if(!partner) return res.status(404).json({profile: 'There is no partner profile for this user'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({profile: 'There is no Application'});

    const newMessage = {
        text,
        sender: partner
    };
    application.messages.push(newMessage);
    return res.json({data: application});
});

// @route   GET api/applications/all/:id
// @desc    Gets All Applications
// @access  Private
router.get('/all/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no consultant profile for this user'});
    else {
        return res.json({data: applications});
    }
});

// @route   GET api/applications/apply/:id/:id2
// @desc    Apply For an Application
// @access  Private
router.post('/apply/:id/:id2',(req,res)=>{
    const id = req.params.id;
    const id2 =req.params.id2;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no consultant profile for this user'});
    const application = applications.find(element => {
        return element.id == id2;
    });
    if(!application) return res.status(404).json({profile: 'There is no such application'});
    const applicant = {
        consultant
    }
    application.applicants.push(applicant);
    return res.json({data: application});
});

module.exports = router;
