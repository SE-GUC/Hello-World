const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Models
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Organization = require('../../models/Organization');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');


// Validation
const validator = require('../../validation/applicationsValidation');



// @route   POST api/applications/:id
// @desc    Submits an Application of a task
// @access  Private
router.post('/:id',(req,res)=>{
    Partner.findOne({organization: req.params.id})
        .then(partner=>{
            if(!partner) return res.status(404).send({error: 'Partner does not exist'});
            const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const newApp = new Application({
                description: req.body.description,
                needConsultancy: req.body.needConsultancy,
                reviewed: req.body.reviewed
            });
            newApp.save()
                .then({msg:'Application was submitted successfully', data: newApp});
        })
        .catch(err => {res.status(404).json({ partnernotfound: 'No partner found' })});
});


// @route   PUT api/applications/:id/:appID
// @desc    Partner Edits an Application of a task
// @access  Private
router.put('/:id/:appID',(req,res)=>{
    Partner.findOne({organization: req.params.id})
        .then(partner =>{
            if (!partner) return res.status(404).send({error: 'Partner does not exist'});
            const isValidated = validator.updateValidation(req.body);
            if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});
            Application.findById(req.params.appID)
                .then(application=>{
                    if (!application) return res.status(404).send({error: 'Application does not exist'});
                        const appFields = {};
                        appFields.description = req.body.description;
                        appFields.needConsultancy = req.body.needConsultancy;
                        appFields.reviewed = req.body.reviewed;
                        Application.findOneAndUpdate(
                            {partner: req.params.id},
                            {$set: appFields},
                            {new: true}
                        ).then(application=>{
                            return res.json({msg: 'Application Was Updated Successfully',data: application});
                        })
                }).catch(err=>{err: {res.status(404).json({ applicationnotfound: 'No Application found' })}})
        }).catch(err=>{err: {res.status(404).json({ partnernotfound: 'No Partner found' })}})
});

// @route   POST api/applications/partner/negotiate/:id/:appID
// @desc    Partner Negotiates Over An Application
// @access  Private
router.post('/partner/negotiate/:id/:appID',(req,res)=>{
    Partner.findOne({organization: req.params.id})
        .then(partner=>{
            if(!partner) return res.status(404).json({profile: 'There is no partner profile for this user'});
            const isValidated = validator.messageValidation(req.body);
            if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});
            Application.findById(req.params.appID)
                .then(application=>{
                    if (!application) return res.status(404).send({error: 'Application does not exist'});
                    if(application.partner !== req.params.id) return res.status(400).send({error: 'This Partner is not responsible for this Application'});
                    const newMessage = {
                        status: 'partner',
                        name: req.body.name,
                        text: req.body.text
                    }
                    application.messages.unshift();
                    return res.json({msg:'Message Sent Successfully',data:application.messages});
                }).catch(err=>{err: {res.status(404).json({ applicationnotfound: 'No Application found' })}})
        }).catch(err=>{err: {res.status(404).json({ partnernotfound: 'No Partner found' })}})
});


// @route   GET api/applications/partner/negotiation/:id/:appID
// @desc    Views Negotiation Over An Application
// @access  Private
router.get('/partner/negotiation/:id/:appID',(req,res)=>{
    Partner.findOne({organization: req.params.id})
        .then(partner=>{
            if(!partner) return res.status(404).json({profile: 'There is no partner profile for this user'});
            Application.findById(req.params.appID)
                .then(application=>{
                    if (!application) return res.status(404).send({error: 'Application does not exist'});
                    if(application.partner !== req.params.id) return res.status(400).send({error: 'This Partner is not responsible for this Application'});
                    return res.json({data: application});
                }).catch(err=>{err: {res.status(404).json({ applicationnotfound: 'No Application found' })}})
        }).catch(err=>{err: {res.status(404).json({ partnernotfound: 'No Partner found' })}})
});

// @route   GET api/applications/admin/all/:id
// @desc    Gets All Applications
// @access  Private
router.get('all/:id',(req,res)=>{
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
