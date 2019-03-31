const express = require('express');
const router = express.Router();


//Load Models
const Member = require('../../models/Member');
const User = require('../../models/User');
const Masterclass = require('../../models/Masterclass');
const Expert = require('../../models/Expert');
const ObjectID = require("mongodb").ObjectID

// LOAD VALIDATION
const validator = require('../../validation/masterclassValidation');


// to test
// @route post api/masterclasses/create
// @desc Creates masterclass
// @access private
router.post('/create',async (req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    if(!name) return res.status(404).json('NO NAME');
    if(!description) return res.status(404).json('NO Description');
    try {
        const newName = await Masterclass.create({
            name: name,
            description: description
        });
        res.json({msg: 'Masterclass created successfully', data: newName})
    }
    catch (e) {
        res.status(404).json(err)
    }
});




// @route   GET api/masterclasses/all/:id
// @desc    View Masterclasses
// @access  Private
router.get('/all/:id',(req,res)=>{

    const id = req.params.id;

    Masterclass.findById(id)
        .then( (newClass) => {
            if ( newClass != null ) {
                return res.status(200)
                    .json({
                        msg: "Master Class Fetched",
                        data: newClass
                    })
            } else {
                return res.status(404)
                    .json({
                        errMsg: "No such Master Class ID"
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .json({
                    errMsg: "Error Trying To Fetch Master Class",
                    err: error
                })
        })

});




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
router.put('/respond/:id/:expertID',async (req,res)=>{
    try {
        const memberID = await Member.findById(req.params.id);
        if (!memberID) return res.status(404).send({error: 'Member not found'});

        const expert = await Expert.findById(req.params.expertID);
        if (!expert) return res.status(404).send({error: 'Expert not found'});

        const isValidated = validator.respondValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

        // const request = await expert.requests.find(element => {
        //     return element.id.equals(expert._id);
        // });

        // console.log(request);

        for ( let i = 0; i < expert.requests.length; i++ ) {
            if( memberID._id.equals(expert.requests[i].member) ) {
                console.log(expert.requests[i]);
                expert.requests[i].status = req.body.response; 
                expert.save();
                return res.json({msg:'Your Request was submitted successfully', data: expert.requests});
            }
        }

        return res.status(404).json({ errMsg: 'Request not found' });
    }
    catch(error) {
        console.log(error);
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
router.put('/assess/:id/:id2',async(req,res)=>{
    try{
    const member = await Member.findById(req.params.id);
    if(!member) return res.status(404).send({error: 'Member does not exist'});
    const expert = await Expert.findById(req.params.id2);
    if(!expert) return res.status(404).send({error: 'this User is not an Expert'});
    const recommendedMasterclass = req.body.masterclass;
    console.log("1");
    const masterclass = masterclasses.findById(element => {
        return element.id == recommendedMasterclass;
    });
    if (!masterclass) return res.status(404).json({masterclass: 'there is no Such Masterclass'});
    member.recommendedMasterclasses.push(masterclass);
    return res.json({data: member.recommendedMasterclasses});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});
module.exports = router;