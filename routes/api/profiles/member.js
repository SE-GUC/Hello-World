
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Task = require('../../../models/Task');
const Masterclass = require('../../../models/Masterclass');

//Load Validation
const validator = require('../../../validation/memberValidation');

// @route GET api/profiles/member/:id
// @desc Get Member's Profile by ID
// @access private
router.get('/:id',async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'})
        return res.json({data: member})
    }
    catch (error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});


// @route post api/profiles/member/:id
// @desc Creates Member Profile
// @access private
router.post('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({error: 'User does not exist'});
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const memberFields = {};
        memberFields.name = req.body.name;
        memberFields.phone = req.body.phone;
        memberFields.email = req.body.email;
        memberFields.age = req.body.age;
        memberFields.user = req.params.id;
        memberFields.skills = req.body.skills.split(',');
        memberFields.interests = req.body.interests.split(',');


        memberFields.social = {};
        if(req.body.youtube) memberFields.social.youtube = req.body.youtube;
        if(req.body.facebook) memberFields.social.facebook = req.body.facebook;
        if(req.body.twitter) memberFields.social.twitter = req.body.twitter;
        if(req.body.linkedin) memberFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) memberFields.social.instagram = req.body.instagram;

        if(req.body.avatar) memberFields.avatar = req.body.avatar;


        const newMember = await Member.create(memberFields);
        return res.json({msg: 'Member was created successfully', data: newMember});

    }
    catch (err) {
        res.status(404).json({ usernotfound: 'User not found' })
        console.log(err)
    }
});

// @route PUT api/profiles/member/:id
// @desc Edit Member's Profile
// @access private
router.put('/:id',async (req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member does not exist'});
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const memberFields = {};
        if(req.body.name) memberFields.name = req.body.name;
        if(req.body.phone) memberFields.phone = req.body.phone;
        if(req.body.email) memberFields.email = req.body.email;
        if(req.body.age) memberFields.age = req.body.age;
        memberFields.user = req.params.id;


        memberFields.social = {};
        if(req.body.youtube) memberFields.social.youtube = req.body.youtube;
        if(req.body.facebook) memberFields.social.facebook = req.body.facebook;
        if(req.body.twitter) memberFields.social.twitter = req.body.twitter;
        if(req.body.linkedin) memberFields.social.linkedin = req.body.linkedin;
        if(req.body.instagram) memberFields.social.instagram = req.body.instagram;

        if(req.body.avatar) memberFields.avatar = req.body.avatar;


        const updatedMember = await Member.findByIdAndUpdate(req.params.id,{$set: memberFields});
        return res.json({msg: 'Member updated successfully'});

    }
    catch (err) {
        return res.status(404).json({ usernotfound: 'User not found' })
    }
});


// @route POST api/profiles/member/skills/add/:id
// @desc Adds A Skill To Member's Profile
// @access private
router.post('/skills/add/:id',(req,res)=>{
    const skill = req.body.skill;
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    if (!skill) return res.status(400).send({ err: 'Skill field is required' });

    member.setOfSkills.push(skill);
    return res.json(member);
});

// @route POST api/profiles/member/interests/add/:id
// @desc Adds Interest To Member's Profile
// @access private
router.post('/Interests/add/:id',(req,res)=>{
    const interest = req.body.interest;
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    if (!interest) return res.status(400).send({ err: 'Interest field is required' });

    member.interests.push(interest);
    return res.json(member);
});

// @route POST api/profiles/member/past-events/add/:id
// @desc Adds Past Event To Member's Profile
// @access private
router.post('/past-events/add/:id',(req,res)=>{
    const eventName = req.body.eventName;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.params.id;

    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    if (!eventName) return res.status(400).send({ err: 'Event Name field is required' });
    if (!description) return res.status(400).send({ err: 'Event Description field is required' });


    const pastEvent = {
        eventName,
        description,
        date
    };
    member.pastEvents.push(pastEvent);
    return res.json(member);
});


// @route POST api/profiles/member/tasks-completed/add/:id/:id2
// @desc Adds Completed Task To Member's Profile
// @access private
router.post('/completed-tasks/add/:id/:id2s',(req,res)=>{
    const memberID = req.params.id;
    const taskID = req.params.id2;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    const task = tasks.find(element => {
        return element.id == id;
    });
    if(!task){
        return res.status(400).json({ profile: 'There is no such Task' });
    };
    for(let applicant of task.applicants){
        if(applicant.member == member ){
            member.tasksCompleted.push(task);
            return res.json(member);
        }
    }
    return res.status(400).json({err: 'This Member is not assigned to this Task'});

});

// @route POST api/profiles/member/certificates/add/:id
// @desc Adds Certificates To Member's Profile
// @access private
router.post('/certificates/add/:id',(req,res)=>{
    const name = req.body.name;
    const date = req.body.date;
    const entity = req.body.entity;
    const description = req.body.description;
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (!date) return res.status(400).send({ err: 'Date field is required' });
    if (!entity) return res.status(400).send({ err: 'Entity field is required' });
    if (!description) return res.status(400).send({ err: 'Description field is required' });


    const certificate = {
        name,
        date,
        entity,
        description
    };
    member.certificates.push(certificate);
    return res.json(member);
});

// @route POST api/profiles/member/masterclasses/add/:id/:id2
// @desc Adds Masterclass To Member's Profile
// @access private
router.post('/masterclasses/add/:id/:id2',(req,res)=>{
    const memberID = req.params.id;
    const masterclassID = req.params.id2;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    const masterclass = masterclasses.find(element => {
        return element.id == id;
    });
    if(!masterclass){
        return res.status(400).json({ profile: 'There is no such Masterclass' });
    };
    for(let applicant of masterclass.applicants){
        if(applicant.member == member ){
            member.masterclasses.push(masterclass);
            return res.json(member);
        }
    }
    return res.status(400).json({err: 'This Member has not completed this Masterclass'});
});


// @route DELETE api/profiles/member/delete/:id
// @desc Delete Member's Profile
// @access private
router.delete('/delete/:id',(req,res) => {
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });

    if(!member){
        return res.status(404).json({ profile: 'There is no Member profile for this user' });
    }
    else{
        members.splice( members.indexOf(member), 1 );
        return res.json({data: members});
    }
});


module.exports = router;
