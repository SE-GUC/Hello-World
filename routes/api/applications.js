const express = require('express');
const router = express.Router();
const uuid = require('uuid');


// Load Models
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Organization = require('../../models/Organization');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');

// Temporary Data
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
    new User('gaafar80','gaafarPassword',5),
    new User('mahmoud','mahmoudPassword',6),
];

const members = [
    new Member('Karim', 21, 'Karim@mail.com', 10, 1),
    new Member('Youssef', 65, 'youssef@mail.com', 11, 2),
    new Member('Moataz', 25, 'moataz@mail.com', 12, 3),
    new Member('Kashlan', 13, 'kashlan@mail.com', 13, 4),
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
const admins = [
    new Admin('Gaafar', 5),
    new Admin('Mahmoud', 6),
];
const consultants = [
    new Consultant(1),
    new Consultant(2),
    new Consultant(3),
];


// @route   POST api/applications/submit/:id
// @desc    Submits an Application of a task
// @access  Private
router.post('/submit/:id',(req,res)=>{
    const description = req.body.description;
    const needConsultancy = req.body.needConsultancy;
    const id = req.params.id;

    if (!description) return res.status(400).send({ err: 'Application Description is required' });
    if (typeof description !== 'string') return res.status(400).send({ err: 'Invalid value for Description' });

    if (!needConsultancy) return res.status(400).send({ err: 'Application Should Verify Whether You Need Consultancy or not' });
    if (needConsultancy !== 'true' && needConsultancy !== 'false' ) return res.status(400).send({ err: 'Invalid value for needConsultancy' });

    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner) return res.status(404).json({profile: 'There is no partner profile for this user'});
    else{
        const newApp = new Application(
            description,
            id,
            uuid.v4(),
            needConsultancy
        );
        applications.push(newApp);
        return res.json({data: newApp});
    }
});


// @route   PUT api/applications/edit/:id/:id2
// @desc    Edits an Application of a task
// @access  Private
router.put('/edit/:id/:id2',(req,res)=>{
    const description = req.body.description;
    const needConsultancy = req.body.needConsultancy;
    const partnerID = req.params.id;
    const appID = req.params.id2;

    if (!description) return res.status(400).send({ err: 'Application Description is required' });
    if (typeof description !== 'string') return res.status(400).send({ err: 'Invalid value for Description' });

    if (!needConsultancy) return res.status(400).send({ err: 'Application Should Verify Whether You Need Consultancy or not' });
    if (needConsultancy !== 'true' && needConsultancy !== 'false' ) return res.status(400).send({ err: 'Invalid value for needConsultancy' });

    const partner = partners.find(element => {
        return element.id == partnerID;
    });
    if(!partner) return res.status(400).json({profile: 'There is no partner profile for this user'});

    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(400).json({application: 'There is no application submitted by this partner'});

    if(partner.id !== application.partner) return res.status(400).json({data: 'This Partner Doesnt have access to this Application'});

    application.description = description;
    if(needConsultancy === 'true') application.needConsultancy = true;
    if(needConsultancy === 'false') application.needConsultancy = false;
    application.reviewed = false;
    return res.json({data: application});

});

// @route   POST api/applications/partner/negotiate/:id/:id2
// @desc    Partner Negotiates Over An Application
// @access  Private
router.post('/partner/negotiate/:id/:id2',(req,res)=>{
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
    if(!application) return res.status(404).json({application: 'There is no such Application'});

    if(application.partner !== partner.id) return res.status(400).json({err: 'This Partner Doesnt have access to this Application'});

    const member = members.find(element => {
        return element.id == partner.id;
    });

    const newMessage = {
        name: member.name,
        text
    };
    application.messages.push(newMessage);
    return res.json({data: application.messages});
});


// @route   GET api/applications/partner/negotiation/:id/:id2
// @desc    Views Negotiation Over An Application
// @access  Private
router.get('/partner/negotiation/:id/:id2',(req,res)=>{
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
    if(!application) return res.status(404).json({profile: 'There is no such Application'});

    if(application.partner !== partner.id) return res.status(400).json({err: 'This Partner Doesnt have access to this Application'});

    return res.json({data: application.messages});
});

// @route   GET api/applications/admin/all/:id
// @desc    Gets All Applications
// @access  Private
router.get('/admin/all/:id',(req,res)=>{
    const id = req.params.id;
    const admin = admins.find(element => {
        return element.id == id;
    });
    if(!admin) return res.status(404).json({admin: 'This User does not have access to this Page'});
    else {
        return res.json({data: applications});
    }
});


// @route   PUT api/applications/admin/review/:id/:id2
// @desc    Admin Reviews Application
// @access  Private
router.put('/admin/review/:id/:id2',(req,res)=>{
    const appID = req.params.id;
    const adminID = req.params.id2;
    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(404).json({admin: 'This User does not have access to this Page'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({application: 'There is no such application'});
    else {
        application.reviewed = true;
        return res.json({data: application});
    }
});


// @route   POST api/applications/admin/negotiate/:id/:id2
// @desc    Admin Negotiates Over An Application
// @access  Private
router.post('/admin/negotiate/:id/:id2',(req,res)=>{
    const text = req.body.text;
    const adminID = req.params.id;
    const appID = req.params.id2;
    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(404).json({profile: 'This User has no access to this Page'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({application: 'There is no such Application'});

    const newMessage = {
        name: admin.name,
        text,
    };
    application.messages.push(newMessage);
    return res.json({data: application.messages});
});


// @route   GET api/applications/admin/negotiation/:id/:id2
// @desc    Views Negotiation Over An Application
// @access  Private
router.get('/admin/negotiation/:id/:id2',(req,res)=>{
    const text = req.body.text;
    const adminID = req.params.id;
    const appID = req.params.id2;
    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(404).json({profile: 'This User has no access to this Page'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({profile: 'There is no such Application'});

    return res.json({data: application.messages});
});


// @route   PUT api/applications/respond/:id/:id2/:id3
// @desc    Admin Responds to Consultant Requests
// @access  Private
router.put('/respond/:id/:id2/:id3',(req,res)=>{
    const response = req.body.response;
    const applicationID = req.params.id;
    const consultantID = req.params.id2;
    const adminID = req.params.id3;

    const application = applications.find(element => {
        return element.id == applicationID;
    });
    if(!application) return res.status(404).json({application: 'There is no such application'});

    const consultant = consultants.find(element => {
        return element.id == consultantID;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no consultant Profile For This User'});

    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(404).json({profile: 'This User has no access to this Page'});

    const applicant = application.applicants.find(element => {
        return element.consultant == consultant;
    });

    if(!applicant) return res.status(404).json({application: 'This Consultant did not apply for this application'});
    applicant.status = response;

    if(applicant.status == 'accepted') application.consultant = consultantID;

    if(!response) return res.status(404).json({err: 'Response Field is Required'});
    return res.json({data: applicant});
});



// @route   GET api/applications/consultant/all/:id
// @desc    Gets All Reviewed Applications
// @access  Private
router.get('/consultant/all/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no consultant profile for this user'});

    const reviewedApplications = applications.filter(function(element) {
        return element.reviewed == true;
    });

    return res.json({data: reviewedApplications});

});

// @route   POST api/applications/apply/:id/:id2
// @desc    Apply For an Application
// @access  Private
router.post('/apply/:id/:id2',(req,res)=>{
    const appID = req.params.id;
    const consultantID =req.params.id2;
    const consultant = consultants.find(element => {
        return element.id == consultantID;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no consultant profile for this user'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({application: 'There is no such application'});

    const organization = organizations.find(element => {
        return element.id = consultant.id;
    });
    if(!application) return res.status(404).json({application: 'There is no such application'});

    const applicant = {
        organization: organization,
        consultant: consultant,
        status: 'pending'
    }
    application.applicants.push(applicant);
    return res.json({data: application});
});

module.exports = router;
