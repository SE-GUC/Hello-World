const express = require('express');
const router = express.Router();

//Load Models
const Member = require('../../models/Member');
const User = require('../../models/User');
const Masterclass = require('../../models/Masterclass');
const Expert = require('../../models/Expert');

// LOAD VALIDATION
const validator = require('../../validation/masterclassValidation');

// @route   POST api/masterclasses/require/:id/:expertID
// @desc    Member Requires Assessment From An Expert
// @access  Private
router.post('/require/:id/:expertID', async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const expert = await Expert.findById(req.params.expertID);
        if (!expert) return res.status(404).send({error: 'Expert not found'});

        
        const request = {
            member: req.params.id,
            status: 'pending'
        }

        expert.requests.unshift(request);
        expert.save();

        return res.json({msg:'Your Request was submitted successfully', data: expert.requests});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});


// @route   PUT api/masterclasses/respond/:id/:expertID
// @desc    Expert Responds to Requests
// @access  Private
router.put('/respond/:id/:id2',async (req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const expert = await Expert.findById(req.params.expertID);
        if (!expert) return res.status(404).send({error: 'Expert not found'});

        const isValidated = validator.respondValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

        const request = expert.requests.find(element => {
            return element.id == memberID;
        });

        request.status = Response;
                                                                                                                                                          expert.requests.unshift(request);
        expert.save();

        return res.json({msg:'Your Request was submitted successfully', data: expert.requests});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});



// @route   POST api/masterclasses/apply/:id/:id2
// @desc    Member Apply For a Masterclass
// @access  Private
router.post('/:id/:id2',async (req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const masterclass = await Masterclass.findById(req.params.id2);
        if (!masterclass) return res.status(404).send({error: 'Masterclass not found'});


        const request = {
            member: req.params.id
        }

        masterclass.requests.unshift(request);

        return res.json({msg:'Request was created successfully', data: masterclass.requests});
    }
    catch(error) {
        return res.status(404).json({ masterclassnotfound: 'Masterclass not found' });
    }

});

// @route   GET api/masterclasses/recommended/:id
// @desc    Member View his Recommended Masterclasses
// @access  Private
router.get('/recommended/:id',async (req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        return res.json({data:member.recommendedMasterclasses});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});

// @route   PUT api/masterclasses/assess/:id/:id2
// @desc    Expert Assess Member
// @access  Private
router.put('/assess/:id/:id2',(req,res)=>{
    const memberID = req.params.id;
    const expertID = req.params.id2;
    const recommendedMasterclass = req.body.masterclass;
    const member = members.find(element => {
        return element.id == memberID;
    });
    if (!member) return res.status(404).json({profile: 'there is no Member Profile for this User'});

    const expert = experts.find(element => {
        return element.id == expertID;
    });
    if (!expert) return res.status(404).json({expert: 'this User is not an Expert'});

    const masterclass = masterclasses.find(element => {
        return element.id == recommendedMasterclass;
    });
    if (!masterclass) return res.status(404).json({masterclass: 'there is no Such Masterclass'});


    member.recommendedMasterclasses.push(masterclass);
    return res.json({data: member.recommendedMasterclasses});
});
module.exports = router;