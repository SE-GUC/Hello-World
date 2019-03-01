const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const Task = require('../../models/Task');
const Application = require('../../models/Application');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');

const tasks = [
    new task(1,1,['bom','t','elhbd'],10000,100)
]
const admins= [
    new Admin('s',1)
];
const consultants = [
    new Consultant( 80, 1,false),
    new Consultant( 90, 2),false,
    new Consultant( 100, 3,false),
    new Consultant( 110, 4,false),
    new Consultant( 123, 5,false),
];
const applications = [
    new Application(55, 3, 1),
    new Application(65, 6, 2),
    new Application(75, 9, 3)
];
//@route api/admin/viewapps
//@desc shows applicaitons
router.get('/viewapps',(req,res)=>{
    res.json({data:applications});
});
//@route api/admin/reviewapp/:id
//@review an application
router.get('/reviewapp/:id',(req,res)=>{
const id = req.params.id;
const app = applications.find(Element =>{
return Element.id = id;
});
if (!app) return res.status(400).send({ err: 'Application not found' });
else{
    res.json({data:app});
}
});
//@route api/admin/conresponse/:id
//@desc boolean response to consultant application
router.put('/conresponse/:id',(req,res)=>{
    const id = req.params.id;
    const r = req.body.r;
    const consultant = consultants.find(Element =>{
        return Element.id = id;
    })
    let i = consultants.indexOf(consultant,0);
    consultants[i].status = r;
    res.json({data:consultants[i]});
});
// @route   POST api/admin/negotiate/:id/:id2
// @desc    Submits an Application of a task
// @access  Private
router.post('/negotiate/:id/:id2',(req,res)=>{
    const text = req.body.text;
    const appID = req.params.id;
    const conid = req.params.id2;
    const consultant = consultants.find(element => {
        return element.id == conid;
    });
    if(!consultant) return res.status(404).json({profile: 'There is no partner profile for this user'});
    const application = applications.find(element => {
        return element.id == appID;
    });
    if(!application) return res.status(404).json({profile: 'There is no Application'});

    const newMessage = {
        text,
        sender: consultant
    };
    application.messages.push(newMessage);
    return res.json({data: application});
});
// @route   GET api/admin/reviewtask/:id
router.get('/reviewtask/:id',(req,res)=>{
    const id = req.params.id;
    const task = tasks.find(element =>{
        return element.id == id;
    })
    res.json({data:task});
})
// @route PUT api/admin/edittask/:id
router.put('/edittask/:id',(req,res)=>
{   
    const levelOfCommitment =req.body.levelOfCommitment;
    const experienceLevel = req.body.experienceLevel;
    const setOfSkills = req.body.setOfSkills;
    const monetaryCompensation = req.body.monetaryCompensation;
    const id = req.params.id;
    const task = tasks.find(element =>{
      return element.id = id;
    });
    let i = tasks.indexOf(task);
    tasks[i].monetaryCompensation = monetaryCompensation;
    tasks[i].levelOfCommitment = levelOfCommitment;
    tasks[i].setOfSkills = setOfSkills;
    tasks[i].experienceLevel = experienceLevel;
    res.json({data: tasks[i]});
});
//@route DELETE api/admin/deletetask/:id
router.delete('deletetask/:id',(req,res)=>{
    const id = req.params.id;
    const task = tasks.find(element =>{
    return    element.id == id;
    });
    let i = tasks.indexOf(task);
    tasks.splice(i,1);
    res.json({data: tasks});
});
module.exports = router;
