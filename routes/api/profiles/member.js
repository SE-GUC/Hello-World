/*

const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Task = require('../../../models/Task');
const Masterclass = require('../../../models/Masterclass');



// @route GET api/profiles/member/:id
// @desc Get Member's Profile by ID
// @access private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member) return res.status(404).json({profile: 'There is no Member profile for this user'});
    else {
        return res.json({data: member});
    }
});


// @route post api/profiles/member/create/:id
// @desc Creates Member Profile
// @access private
router.post('/create/:id',(req,res)=>{
    const { name, age, email, phone}  = req.body
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });

    const user = users.findone(element => {
        return element.id == id;
    });

    if(!user) return res.status(400).json({profile: 'User Does Not Exist'});
    const member = new Member(
        name,
        age,
        email,
        phone,
        user.id
    );
    member.save()
    .then(member => res.json({data: user}))
    .catch(err => res.json({error: 'Can not create user'}))
});

// @route PUT api/profiles/member/edit/:id
// @desc Edit Member's Profile
// @access private
router.put('/edit/:id',(req,res)=>{
    const { name, age, email, phone}  = req.body
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});

    const member = members.findone(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    }
    else {
        member.name = name;
        member.age = age;
        member.email = email;
        member.phone = phone;

        return res.json({data: members});
    }
});


// @route POST api/profiles/member/skills/add/:id
// @desc Adds A Skill To Member's Profile
// @access private
router.post('/skills/add/:id',(req,res)=>{
    const skill = req.body.skill;
    const id = req.params.id;
    const member = members.findone(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    if (!skill) return res.status(400).send({ err: 'Skill field is required' });

    member.setOfSkills.save()
    return res.json(member);
});

// @route POST api/profiles/member/interests/add/:id
// @desc Adds Interest To Member's Profile
// @access private
router.post('/Interests/add/:id',(req,res)=>{
    const interest = req.body.interest;
    const id = req.params.id;
    const member = members.findone(element => {
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
    const {eventName,description,date} = req.body;
    const id = req.params.id;

    const member = members.findone(element => {
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
    const member = members.findone(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    const task = Task.findone(element => {
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
    const {name,date,entity,description} = req.body;
    const id = req.params.id;
    const member = members.findone(element => {
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
    const member = Member.findone(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
    };
    const masterclass = masterclasses.findone(element => {
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
   
    
    
        Member.findOneAndDelete({user:req.params.id})
        .then(member=>{
            if(!member){
                return res.status(404).json({ profile: 'There is no Member profile for this user' });
            }        })
            
        return res.json({data:members});
    
});


module.exports = router;
*/