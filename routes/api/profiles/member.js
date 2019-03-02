const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Task = require('../../../models/Task');
const Masterclass = require('../../../models/Masterclass');

// Temporary Data
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
];

const members = [
    new Member('Karim', 21, 'Karim@mail.com', 10, 1),
    new Member('Youssef', 65, 'youssef@mail.com', 11, 2),
    new Member('Moataz', 25, 'moataz@mail.com', 12, 3),
    new Member('Kashlan', 13, 'kashlan@mail.com', 13, 4),
];
const tasks = [
    new Task('High','Medium',['node','express','react'],1500,1),
    new Task('Medium','High',['java','unit testing'],1000,2),
    new Task('Low','Low',['HTML','CSS','Javascript'],500,3),
];

const masterclasses = [
    new Masterclass('Javascript', 'Master Javascript in 10 Days!', 1),
    new Masterclass('Python', 'From Zero To Hero - Become A Python Expert', 2),
    new Masterclass('React', 'React Course For Complete Beginners', 3)
];

// @route GET api/profiles/member/:id
// @decs Get Member's Profile by ID
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
// @decs Creates Member Profile
// @access private
router.post('/create/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });

    const user = users.find(element => {
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
    members.push(member);
    return res.json({data: member});
});

// @route PUT api/profiles/member/edit/:id
// @decs Edit Member's Profile
// @access private
router.put('/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});

    const member = members.find(element => {
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
// @decs Adds A Skill To Member's Profile
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
// @decs Adds Interest To Member's Profile
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
// @decs Adds Past Event To Member's Profile
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
// @decs Adds Completed Task To Member's Profile
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
// @decs Adds Certificates To Member's Profile
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
// @decs Adds Masterclass To Member's Profile
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
// @decs Delete Member's Profile


module.exports = router;
