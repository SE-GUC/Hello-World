const express = require('express');
const router = express.Router();
const uuid = require('mongoose');

//Load Consultant Model
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Organization = require('../../models/Organization');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');

// Validation
const validator = require('../../validation/consultantValidations');

/*// Temporary Data
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
];*/


// @route   POST api/profiles/consultant/create/:id
// @desc    Creates Consultant Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const organization = organizations.find(element => {
       return element.req.params.id === req.params.id;
    });
    if(!organization)   return res.status(404).json({ profile: 'There is no Organization profile for this user' });
    const isValidated = validator.editValidation(req.body);
	 if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
	const newconsultant = new consultant({
                id: req.body.id,
                workPosition: req.body.workPosition,
                status: req.body.status,
				boardMembers: req.body.boardMembers,
				events: req.body.events,
				partners: req.body.partners,
				reports: req.body.reports,
				applications: req.body.applications,
            });
            newconsultant.save()
                .then({msg:'consultant was not created  successfully', data: newconsultant});
        })
        


// @route   GET api/profiles/consultant/:id
// @desc    Get consultant's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
       return element.req.params.id === req.params.id;
    });
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    
        return res.json({data: consultant});
    

});


// @route   PUT api/profiles/consultant/edit/:id
// @desc    Edit consultant's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.req.params.id === req.params.id;
    });
	const isValidated = validator.editValidation(req.body);
            if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    else{
        const consultantFields = {};
                        consultantFields.id = req.body.id;
                        consultantFields.workPosition = req.body.workPosition;
                        consultantFields.status = req.body.status;
						consultantFields.boardMembers = req.body.boardMembers;
						consultantFields.events = req.body.events;
						consultantFields.partners = req.body.partners;
						consultantFields.reports = req.body.reports;
						consultantFields.applications = req.body.applications;
                       consultant.findOneAndUpdate(
                            {consultant: req.params.id},
                            {$set: consultantFields},
                            {new: true}
                        ).then(consultant=>{
                            return res.json({msg: 'consultant profile Was edited Successfully',data: consultant});
                        })
                }


// @route POST api/profiles/consultant/board-members/add/:id
// @decs Adds Board Member To Consultant's Profile
// @access private
router.post('/board-members/add/:id',(req,res)=>{
   

    const consultant = consultants.find(element => {
       return element.req.params.id === req.params.id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
	const isValidated = validator.addboardmembersValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    { $addToSet: {boardmembers: [ req.body.boardmembers ] } };


   
});


// @route POST api/profiles/consultant/events/add/:id
// @decs Adds Event To Consultant's Profile
// @access private
router.post('/events/add/:id',(req,res)=>{
    

    const consultant = consultants.find(element => {
         return element.req.params.id === req.params.id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
	const isValidated = validator.addeventsValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

   { $addToSet: {events: [ req.body.events ] } };
});

// @route POST api/profiles/consultant/partners/add/:id/:id2
// @decs Adds Partner to Partner's Profile
// @access private
router.post('/partners/add/:id/:id2',(req,res)=>{
    const consultantID = req.params.id;
    const partnerID = req.params.id2;
    const consultant = consultants.find(element => {
        return element.req.params.id === req.params.consultantID;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    const partner = partners.find(element => {
        return element.req.params.id === req.params.partnerID;
    });
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const organization = organizations.find(element => {
        return element.req.params.id === req.params.organizationID;
    });
    if(!organization){
        return res.status(400).json({ profile: 'There is no Organization profile for this user' });
    };
	const isValidated = validator.addpartnersValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
   { $addToSet: {events: [ req.body.events ] } };
});


// @route POST api/profiles/consultant/reports/add/:id
// @decs Adds A Report To Consultant's Profiles
// @access private
router.post('/reports/add/:id',(req,res)=>{
    
    const consultant = consultants.find(element => {
        return element.req.params.id === req.params.consultantID;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    if (!report) return res.status(400).send({ err: 'Report field is required' });
	const isValidated = validator.addreportsValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

   { $addToSet: {events: [ req.body.events ] } };
});

// @route   DELETE api/profiles/consultant/delete/:id
// @desc    Delete consultant's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.req.params.id === req.params.consultantID;
    });
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    consultants.splice( consultants.indexOf(consultant), 1 );
        return res.json({data: consultants});
});

module.exports = router;
});
