

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const mongoose = require('mongoose');
//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Task = require('../../../models/Task');
const Masterclass = require('../../../models/Masterclass');


// Validation
const validator = require('../../validation/memberValidation');
// @route GET api/profiles/member/:id
// @desc Get Member's Profile by ID
// @access private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Member.findone(id)
    .then(member=>{
  res.json({data: member})
    })
    .catch(err => {res.status(404).json({ membernotfound: 'member not found' })})
})


// @route post api/profiles/member/create/:id
// @desc Creates Member Profile
// @access private
router.post('/create/:id',(req,res)=>{
    const { name, age, email, phone}  = req.body
    const id = req.params.id
    const user = users.findone(id)
    .then(user=>{
    if(!user) return res.status(400).json({profile: 'User Does Not Exist'});
    const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    const member = new Member(
        name,
        age,
        email,
        phone,
        user.id
    )})
    member.save()
    .then({msg:'Application was submitted successfully', data: newApp})
    .catch(err => res.json({error: 'Can not create user'}))
});

// @route PUT api/profiles/member/edit/:id
// @desc Edit Member's Profile
// @access private
router.put('/edit/:id',(req,res)=>{
    const { name, age, email, phone}  = req.body
    const id = req.params.id;

    
    const member1 = Member.findone(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err: {res.status(404).json({ memberNotFound: 'Member Not Found' })}})
        member1.name = name;
        member1.age = age;
        member1.email = email;
        member1.phone = phone;
        Member.findOneAndUpdate(
            {member: req.params.id},
            {$set: member1},
            {new: true})
            .then(member=>{
                return res.json({msg: 'updated',data: member})})
                .catch(err=>{err:{res.status(404).json({MemberNotFound:'Could not find member'})}})
    
})


// @route POST api/profiles/member/skills/add/:id
// @desc Adds A Skill To Member's Profile
// @access private
router.post('/skills/add/:id',(req,res)=>{
    const skill = req.body.skill;
    const id = req.params.id;
    const member = Member.findone(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:{res.status(404).json({MemberNotFound:'Member not found'})}})
    
    member.setOfSkills.save()
    .then(member=>{res.json(member)})
    .catch(err=>{err:{res.status(404).json({SaveError:'An error occurred while saving'})}})
    
});

// @route POST api/profiles/member/interests/add/:id
// @desc Adds Interest To Member's Profile
// @access private
router.post('/Interests/add/:id',(req,res)=>{
    const interest = req.body.interest;
    const id = req.params.id;
    const member = Member.findone(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    }})
    member.interests.push(interest);
    Member.findOneAndUpdate(
        {member1:id},
        {$set: member},
        {new: true})
        .then(member=>{return res.json(member);})
        .catch(err=>{err:{res.status(404).json({Posterror:'Could not update'})}})
});

// @route POST api/profiles/member/past-events/add/:id
// @desc Adds Past Event To Member's Profile
// @access private
router.post('/past-events/add/:id',(req,res)=>{
    const {eventName,description,date} = req.body;
    const id = req.params.id;

    const member1 = members.findone(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:(res.status.json({Cannotfind:'Member Not found'}))})
    const pastEvent = {
        eventName,
        description,
        date
    };
    member1.pastEvents.push(pastEvent);
    return res.json(member1.pastEvents);
});


// @route POST api/profiles/member/tasks-completed/add/:id/:id2
// @desc Adds Completed Task To Member's Profile
// @access private
router.post('/completed-tasks/add/:id/:id2s',(req,res)=>{
    const memberID = req.params.id;
    const taskID = req.params.id2;
    const member = members.findone(memberID)
    .then(member=>{    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    }})
    .catch(err=>{err:(status(404).json({memberNotFound:'Member Not Found'}))})
    const task = Task.findone(taskID)
    .then(task=>{
    if(!task){
        return res.status(400).json({ profile: 'There is no such Task' });
    }})
    for(let applicant of task.applicants){
        if(applicant.member == member ){
            member.tasksCompleted.push(task);
            return res.json(member.tasksCompleted);
        }
    }
    //return res.status(400).json({err: 'This Member is not assigned to this Task'});

});

// @route POST api/profiles/member/certificates/add/:id
// @desc Adds Certificates To Member's Profile
// @access private
router.post('/certificates/add/:id',(req,res)=>{
    const {name,date,entity,description} = req.body;
    const id = req.params.id;
    const member = Member.findone(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.submitValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    }})
    .catch(err=>{err:(status(404).json({memberNotFound:'Member Not Found'}))})
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
    const member = Member.findone(memberID)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    }})
    .catch(err=>{err:(status(404).json({memberNotFound:'Member Not Found'}))})
    const masterclass = Masterclass.findone(masterclassID)
    .then(masterclass=>{
    if(!masterclass){
        return res.status(400).json({ profile: 'There is no such Masterclass' });
    }})
    .catch(err=>{err:(status(404).json({masterclassNotFound:'Masterclass not found'}))})
    for(let applicant of masterclass.applicants){
        if(applicant.member == member ){
            member.masterclasses.push(masterclass);
            return res.json(member);
        }
    }
  //  return res.status(400).json({err: 'This Member has not completed this Masterclass'});
});


// @route DELETE api/profiles/member/delete/:id
// @desc Delete Member's Profile
// @access private
router.delete('/delete/:id',(req,res) => {
   
    
    
        Member.findOneAndDelete({user:req.params.id})
        .then(member=>{
            if(!member){
                return res.status(404).json({ profile: 'There is no Member profile for this user' });
            }        })
            
        return res.json({data:members});
    
});


module.exports = router;