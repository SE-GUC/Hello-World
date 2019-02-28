const express = require('express');
const router = express.Router();
const _ = require('underscore');
const uuid = require('uuid');


// Load Models
const Task = require('../../models/Task');
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Partner = require('../../models/Partner');

// Temporary Data
const applications = [
    new Application(55, 3, 1),
    new Application(65, 6, 2),
    new Application(75, 9, 3)
];

const tasks = [
    new Task(1 , 50 , 1),
    new Task(2 , 60 , 2),
    new Task(1 , 70 , 1),
];

const users = [
    new User(1),
    new User(2),
    new User(3),
    new User(4),
    new User(5),
];

const members = [
    new Member('Karim', 30, 1),
    new Member('Karim', 40, 2),
    new Member('Karim', 50, 3),
];

const partners = [
    new Partner('Karim Hisham', 45, 1),
    new Partner('Karem Hesham', 35, 2),
    new Partner('Kareem Hisham', 40, 3),
    new Partner('The Kareem Hisham', 21, 4),
    new Partner('The Karim Hisham', 90, 5),
];

// @route   GET api/tasks/test
// @desc    Tests tasks route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'tasks works'});
})

router.get('/sugar', (req,res)=>{
    let array = [1,2,3];
    array = _.reject(array,element=>{
        element == 2;
    });
    res.json({data: array});
})




// @route   GET api/tasks/all
// @desc    Gets all tasks
// @access  private
router.get('/all/:id', (req,res)=>{
    const id = req.params.id;
    const user = users.find(element => {
        return element.id == id;
    });
    if(!user) return res.status(404).json({profile: 'User Does not Exist'});
    return res.json({data: tasks});
});

// @route   POST api/tasks/apply/:id/id2
// @desc    Apply For a Task
// @access  private
router.post('/apply/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const task = tasks.find(element => {
        return element.id == taskID;
    });
    if(!task) return res.status(404).json({profile: 'There is no such task'});
    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(404).json({profile: 'There is no member profile for this user'});
    const applicant = {
        member
    }
    task.applicants.push(applicant);
    return res.json({data: task});
});

// @route   DELETE api/tasks/delete-application/:id/id2
// @desc    Delete Member's Application For a Task
// @access  private
router.delete('/delete-application/:id/:id2',(req,res)=>{
    const taskID = req.params.id;
    const memberID = req.params.id2;
    const task = tasks.find(element =>{
        return element.id == taskID;
    });
    if(!task) return res.status(404).json({profile: 'There is no such task'});
    const member = members.find(element =>{
        return element.id == memberID;
    });
    if(!member) return res.status(404).json({profile: 'There is no member profile for this task'});
    const application = task.applicants.find(element=>{
        return element.member == member;
    });
    if(!application) return res.status(404).json({profile: 'There is no application for this member on this task'});
    task.applicants = _.reject(task.applicants,element=>{
        return element.member == member;
    });
    return res.json({data: task.applicants});
});

// @route   POST api/tasks/post/no-consultant/:id/:id2
// @desc    Partner Posts a Task
// @access  private
router.post('/post/no-consultant/:id/:id2',(req,res)=>{
    const number = req.body.number;
    const appID = req.params.id;
    const partnerID = req.params.id2;
    if(!number) return res.status(404).json({profile: 'Number Field is Reqiured'});
    const application = applications.find(element=>{
        return element.id == appID;
    });
    if(!application) return res.status(404).json({profile: 'There is no such application'});
    const partner = partners.find(element=>{
        return element.id == partnerID;
    });
    if(!partner) return res.status(404).json({profile: 'There is no Partner Profile for this user'});
    if(application.partner !== partner){
        return res.status(404).json({profile: 'This Partner does not hold access to this task'});
    }
    const newTask = new Task(
        application,
        number,
        uuid.v4()
        );
    tasks.push(newTask);
    return res.json({data: tasks});

});

module.exports = router;