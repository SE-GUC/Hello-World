const express = require('express');
const router = express.Router();
const _ = require('underscore');
const uuid = require('uuid');


// Load Models
const Task = require('../../models/Task');
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Organization = require('../../models/Organization');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');

// Temporary Data
const applications = [
    new Application('Freelancing Website',1,1,false),
    new Application('Online Hotel Booking Website',2,2,true),
    new Application('Cryptocurrency website',3,3,true),
];
const tasks = [
    new Task('High','Medium',['node','express','react'],1500,1),
    new Task('Medium','High',['java','unit testing'],1000,2),
    new Task('Low','Low',['HTML','CSS','Javascript'],500,3),
];
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
    new User('gaafar80','gaafarPassword',5),
    new User('mahmoud','mahmoudPassword',6),
];
// const members = [
// //     new Member('Karim', 21, 'Karim@mail.com', 10, 1),
// //     new Member('Youssef', 65, 'youssef@mail.com', 11, 2),
// //     new Member('Moataz', 25, 'moataz@mail.com', 12, 3),
// //     new Member('Kashlan', 13, 'kashlan@mail.com', 13, 4),
// // ];

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
const admins = [
    new Admin('Gaafar', 5),
    new Admin('Mahmoud', 6),
];
const consultants = [
    new Consultant(1),
    new Consultant(2),
    new Consultant(3),
];
applications[2].consultant = 2;
members[0].setOfSkills.push('node');
members[0].setOfSkills.push('CSS');
members[0].setOfSkills.push('express');
members[0].setOfSkills.push('react');



// @route   GET api/tasks/all/:id
// @desc    Gets all tasks
// @access  private
router.get('/all/:id', (req,res)=>{
    const id = req.params.id;
    const user = users.find(element => {
        return element.id == id;
    });
    if(!user) return res.status(400).json({user: 'User Does not Exist'});
    return res.json({data: tasks});
});


// @route   GET api/tasks/recommended/:id
// @desc    Gets Recommended tasks
// @access  private
router.get('/recommended/:id', (req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member) return res.status(400).json({user: 'Only Users With Members Profile Can View This Page'});

    const recommendedTasks = [];
    for(let skill of member.setOfSkills){
        for(let task of tasks){
            for(let skill2 of task.setOfSkills){
                if(skill == skill2) recommendedTasks.push(task);
            }
        }
    }

    return res.json({data: recommendedTasks});
});


// @route   POST api/tasks/apply/:id/:id2
// @desc    Eligible Member Apply For a Task
// @access  private
router.post('/apply/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such task'});
    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(400).json({profile: 'There is no member profile for this user'});

    for(let skill of task.setOfSkills){
        if(!member.setOfSkills.includes(skill)) return res.status(400).json({data:'Member is not Eligible to Apply for this Task'});
    }

    const applicant = {
        member,
        status: 'pending'
    }
    task.applicants.push(applicant);
    return res.json({data: task});
});

// @route   DELETE api/tasks/delete-application/:id/:id2
// @desc    Delete Member's Application For a Task
// @access  private
router.delete('/delete-application/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const task = tasks.find(element =>{
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such task'});
    const member = members.find(element =>{
        return element.id == memberID;
    });
    if(!member) return res.status(400).json({profile: 'There is no member profile for this task'});
    const application = task.applicants.find(element=>{
        return element.member == member;
    });
    if(!application) return res.status(400).json({application: 'There is no application for this member on this task'});
    task.applicants = _.reject(task.applicants,element=>{
        return element.member == member;
    });
    return res.json({data: task.applicants});
});

// @route   POST api/tasks/partner/post/:id/:id2
// @desc    Partner Posts a Task
// @access  private
router.post('/partner/post/:id/:id2',(req,res)=>{
    const levelOfCommitment = req.body.levelOfCommitment;
    const experienceLevel = req.body.experienceLevel;
    const monetaryCompensation = req.body.monetaryCompensation;
    const appID = req.params.id;
    const partnerID = req.params.id2;

    if(!levelOfCommitment) return res.status(400).json({task: 'Level Of Commitment Field is Required'});
    if(typeof levelOfCommitment !== 'string') return res.status(400).json({task: 'Invalid Value for Level Of Commitment'});

    if(!experienceLevel) return res.status(400).json({task: 'Experience Level Field is Required'});
    if(typeof experienceLevel !== 'string') return res.status(400).json({task: 'Invalid Value for Experience Level'});

    if(!monetaryCompensation) return res.status(400).json({task: 'Monetary Compensation Field is Required'});
    if(isNaN(monetaryCompensation)) return res.status(400).json({task: 'Invalid Value for Monetary Compensation'});

    if(!req.body.setOfSkills) return res.status(400).json({task: 'Set Of Skills Field is Required'});
    const setOfSkills = req.body.setOfSkills.split(',');

    const application = applications.find(element=>{
        return element.id == appID;
    });
    if(!application) return res.status(400).json({profile: 'There is no such application'});
    const partner = partners.find(element=>{
        return element.id == partnerID;
    });
    if(!partner) return res.status(400).json({profile: 'There is no Partner Profile for this user'});
    if(application.partner !== partner.id){
        return res.status(400).json({profile: 'This Partner does not hold access to this task'});
    }

    if(application.needConsultancy === true) return res.status(400).json({err:'This Task Can Only be Posted by a Consultant'});

    const newTask = new Task(
        levelOfCommitment,
        experienceLevel,
        setOfSkills,
        monetaryCompensation,
        appID
        );
    tasks.push(newTask);
    return res.json({data: tasks});

});

// @route   PUT api/tasks/partner/respond/:id/:id2/:id3
// @desc    Partner Responds to Member Applications
// @access  Private
router.put('/partner/respond/:id/:id2/:id3',(req,res)=>{
    const response = req.body.response;
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const partnerID = req.params.id3;

    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such Task'});

    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(400).json({profile: 'There is no member Profile For This User'});

    const partner = partners.find(element => {
        return element.id == partnerID;
    });
    if(!partner) return res.status(400).json({profile: 'There is no partner Profile For This User'});

    const applicant = task.applicants.find(element => {
        return element.member == member;
    });

    if(!applicant) return res.status(400).json({application: 'This Member did not apply for this application'});

    const application = applications.find(element => {
        return element.id == taskID;
    });
    if(!partner) return res.status(400).json({profile: 'There is no partner Profile For This User'});

    if(partner.id !== application.partner) return res.status(400).json({application: 'This Partner did not apply for this Task'});

    if(application.needConsultancy)  return res.status(400).json({err: 'This User Can not respond to Applicants on this Task'});

    if(!response) return res.status(400).json({err: 'Response Field is Required'});
    applicant.status = response;
    if(applicant.status == 'accepted') task.acceptedApplicants.push(applicant);
    return res.json({data: applicant});
});


// @route   PUT api/tasks/admin/review/:id/:id2
// @desc    Admin Reviews Task
// @access  Private
router.put('/admin/review/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const adminID = req.params.id2;
    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(400).json({user: 'This User does not have access to this Page'});
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({application: 'There is no such Task'});
    else {
        task.reviewed = true;
        return res.json({data: task});
    }
});

// @route   PUT api/tasks/admin/extra/:id/:id2
// @desc    Admin Adds Extra Attribute To Task
// @access  Private
router.put('/admin/extra/:id/:id2',(req,res)=>{
    const extra = req.body.extra;
    const taskID = req.params.id;
    const adminID = req.params.id2;
    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(400).json({admin: 'This User does not have access to this Page'});
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({application: 'There is no such Task'});
    task.extra.push(extra);
    return res.json({data: task});

});

// @route   PUT api/tasks/admin/edit/:id/:id2
// @desc    Admin Edits Task
// @access  Private
router.put('/admin/edit/:id/:id2',(req,res)=>{
    const levelOfCommitment = req.body.levelOfCommitment;
    const experienceLevel = req.body.experienceLevel;
    const monetaryCompensation = req.body.monetaryCompensation;
    const taskID = req.params.id;
    const adminID = req.params.id2;

    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(400).json({user: 'This User does not have access to this Page'});
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such Task'});

    if(!levelOfCommitment) return res.status(400).json({task: 'Level Of Commitment Field is Required'});
    if(typeof levelOfCommitment !== 'string') return res.status(400).json({task: 'Invalid Value for Level Of Commitment'});

    if(!experienceLevel) return res.status(400).json({task: 'Experience Level Field is Required'});
    if(typeof experienceLevel !== 'string') return res.status(400).json({task: 'Invalid Value for Experience Level'});

    if(!monetaryCompensation) return res.status(400).json({task: 'Monetary Compensation Field is Required'});
    if(isNaN(monetaryCompensation)) return res.status(400).json({task: 'Invalid Value for Monetary Compensation'});

    if(!req.body.setOfSkills) return res.status(400).json({task: 'Set Of Skills Field is Required'});
    const setOfSkills = req.body.setOfSkills.split(',');


    task.levelOfCommitment = levelOfCommitment;
    task.experienceLevel = experienceLevel;
    task.monetaryCompensation = monetaryCompensation;
    task.setOfSkills = setOfSkills;

    return res.json({data: task});
});


// @route   DELETE api/tasks/admin/delete/:id/:id2
// @desc    Admin Deletes Task
// @access  Private
router.delete('/admin/delete/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const adminID = req.params.id2;

    const admin = admins.find(element => {
        return element.id == adminID;
    });
    if(!admin) return res.status(400).json({user: 'This User does not have access to this Page'});
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such Task'});

    tasks.splice( tasks.indexOf(task), 1 );
    res.json({data: tasks});
});


// @route   POST api/tasks/consultant/post/:id/:id2
// @desc    Consultant Posts a Task
// @access  private
router.post('/consultant/post/:id/:id2',(req,res)=>{
    const levelOfCommitment = req.body.levelOfCommitment;
    const experienceLevel = req.body.experienceLevel;
    const monetaryCompensation = req.body.monetaryCompensation;
    const appID = req.params.id;
    const consultantID = req.params.id2;

    if(!levelOfCommitment) return res.status(400).json({task: 'Level Of Commitment Field is Required'});
    if(typeof levelOfCommitment !== 'string') return res.status(400).json({task: 'Invalid Value for Level Of Commitment'});

    if(!experienceLevel) return res.status(400).json({task: 'Experience Level Field is Required'});
    if(typeof experienceLevel !== 'string') return res.status(400).json({task: 'Invalid Value for Experience Level'});

    if(!monetaryCompensation) return res.status(400).json({task: 'Monetary Compensation Field is Required'});
    if(isNaN(monetaryCompensation)) return res.status(400).json({task: 'Invalid Value for Monetary Compensation'});

    if(!req.body.setOfSkills) return res.status(400).json({task: 'Set Of Skills Field is Required'});
    const setOfSkills = req.body.setOfSkills.split(',');

    const application = applications.find(element=>{
        return element.id == appID;
    });
    if(!application) return res.status(400).json({profile: 'There is no such application'});
    const consultant = consultants.find(element=>{
        return element.id == consultantID;
    });
    if(!consultant) return res.status(400).json({profile: 'There is no Consultant Profile for this user'});
    if(application.consultant !== consultant.id){
        return res.status(400).json({profile: 'This Consultant does not hold access to this task'});
    }

    if(application.needConsultancy !== true) return res.status(400).json({err:'This Task Can Only be Posted by a Partner'});

    const newTask = new Task(
        levelOfCommitment,
        experienceLevel,
        setOfSkills,
        monetaryCompensation,
        appID
    );
    tasks.push(newTask);
    return res.json({data: tasks});

});


// @route   PUT api/tasks/consultant/respond/:id/:id2/:id3
// @desc    Consultant Responds to Member Applications
// @access  Private
router.put('/consultant/respond/:id/:id2/:id3',(req,res)=>{
    const response = req.body.response;
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const consultantID = req.params.id3;

    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(400).json({task: 'There is no such Task'});

    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(400).json({profile: 'There is no member Profile For This User'});

    const consultant = consultants.find(element => {
        return element.id == consultantID;
    });
    if(!consultant) return res.status(400).json({profile: 'There is no consultant Profile For This User'});

    const applicant = task.applicants.find(element => {
        return element.member == member;
    });

    if(!applicant) return res.status(400).json({application: 'This Member did not apply for this application'});

    const application = applications.find(element => {
        return element.id == taskID;
    });
    if(!consultant) return res.status(400).json({profile: 'There is no partner Profile For This User'});

    if(consultant.id !== application.consultant) return res.status(400).json({application: 'This Consultant is not The Consultant for this Task'});

    if(!application.needConsultancy)  return res.status(400).json({err: 'This User Can not respond to Applicants on this Task'});

    if(!response) return res.status(400).json({err: 'Response Field is Required'});
    applicant.status = response;
    if(applicant.status == 'accepted') task.acceptedApplicants.push(applicant);
    return res.json({data: task.applicants});
});

module.exports = router;