
const express = require('express');
const router = express.Router();
const _ = require('underscore');

// Load Models
const Task = require('../../models/Task');
const Application = require('../../models/Application');
const User = require('../../models/User');
const Member = require('../../models/Member');
const Organization = require('../../models/Organization');
const Partner = require('../../models/Partner');
const Consultant = require('../../models/Consultant');
const Admin = require('../../models/Admin');


// Load Validation
const validator = require('../../validation/tasksValidation');


// @route   GET api/tasks/all/:id
// @desc    Gets all tasks
// @access  public
router.get('/all',async (req,res)=>{
    try {
        const tasks = await Task.find({});
        return res.json({data: tasks})
    }
    catch (error) {
        return res.status(404).json({ applicationnotfound: 'No Applications found' });
    }
});


// @route   POST api/tasks/apply/:id/:taskID
// @desc    Eligible Member Apply For a Task
// @access  private
router.post('/apply/:id/:taskID',async(req,res)=>{
    try {
        const memeber = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const task = await Task.findById(req.params.taskID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        for(let skill of task.skills){
            if(!member.skills.includes(skill)) return res.status(400).json({data:'Member is not Eligible to Apply for this Task'});
        }

        const applicant = {
            member: req.params.id,
            status: 'pending'
        }

        task.applicants.unshift(applicant);
        task.save();

        return res.json({msg:'Your Application was submitted successfully', data: task.applicants});
    }
    catch(error) {
        res.status(404).json({ membernotfound: 'Member not found' });
        console.log(error);
    }
});

// @route   GET api/tasks/recommended/:id
// @desc    Gets Recommended tasks
// @access  private
router.get('/recommended/:id', async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const tasks = Task.find();
        const recommendedTasks = [];
        for(let skill of member.setOfSkills){
            for(let task of tasks){
                for(let skill2 of task.setOfSkills){
                    if(skill == skill2) recommendedTasks.push(task);
                }
            }
        }

        return res.json({data:recommendedTasks});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});


// @route   DELETE api/tasks/:id/:taskID
// @desc    Delete Member's Application For a Task
// @access  private
router.delete('/:id/:taskID',async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const task = await Task.findById(req.params.taskID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        task.applicants = _.reject(task.applicants,element=>{
            return element.member == member;
        });
        task.save();
        res.json({msg:'Member application was deleted successfully', data: task.applicants})
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});

// @route   POST api/tasks/partner/:id/:appID
// @desc    Partner Posts a Task
// @access  private
router.post('partner/:id/:appID',async(req,res)=>{
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).send({error: 'Partner not found'});

        const application = await Application.findById(req.params.appID);
        if (!application) return res.status(404).send({error: 'Application not found'});

        const isValidated = validator.postValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        if(!application.needConsultancy){
            return res.status(400).json({Unauthorized: 'This Partner is not responsible for this task'});
        }

        if(!application.reviewed){
            return res.status(400).json({error: 'This Application has not been reviewed yet '});
        }

        if(application.partner != req.params.id){
            return res.status(400).json({ Unauthorized: 'This Partner is not responsible for this Application' });
        }

        const fields = {};
        fields.application = req.params.appID;
        fields.levelOfCommitment = req.body.levelOfCommitment;
        fields.monetaryCompensation = req.body.monetaryCompensation;
        fields.experienceLevel = req.body.experienceLevel;
        fields.skills = req.body.skills.split(',');

        for(let applicant of application.applicants){
            if(applicant.status=='accepted'){
                fields.consultant = applicant;
            }
        }

        const newTask = await Task.create(fields);
        return res.json({msg:'Task was created successfully', data: newTask});
    }
    catch(error) {
        return res.status(404).json({ partnernotfound: 'Partner not found' });
    }
});

// @route   PUT api/tasks/partner/respond/:id/:id2/:taskID
// @desc    Partner Responds to Member Applications
// @access  Private
router.post('partner/respond/:id/:id2/:taskID',async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const partner = await Partner.findById(req.params.id2);
        if (!partner) return res.status(404).send({error: 'Partner not found'});

        const task = await Task.findById(req.params.taskID).populate('application');
        if (!task) return res.status(404).send({error: 'Task not found'});

        if(task.application.needConsultancy){
            return res.status(400).json({Unauthorized: 'This Partner is not responsible for this task'});
        }

        if(task.application.partner != req.params.id2){
            return res.status(400).json({Unauthorized: 'This Task Can Only be posted by a Consultant'});
        }


        const isValidated = validator.respondValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const applicant = task.applicants.find(element => {
            return element.member == req.params.id;
        });

        if(!applicant) return res.status(404).json({error:'This Member did not apply for This Task'});

        applicant.status = req.body.response;

        task.save();

        return res.json({msg:'Response Saved',data:task});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});


// @route   POST api/tasks/admin/review/:id/:taskID
// @desc    Admin Reviews Task
// @access  Private
router.post('/admin/:id/:taskID',async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send({error: 'Admin not found'});

        const task = await Task.findById(req.params.taskID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        task.reviewed = true;

        task.save();

        return res.json({msg:'Task Reviewed Successfully',data:task});
    }
    catch(error) {
        return res.status(404).json({ adminnotfound: 'Admin not found' });
    }
});

// @route   PUT api/tasks/admin/extra/:id/:taskID
// @desc    Admin Adds Extra Attribute To Task
// @access  Private
router.put('/admin/:id/:taskID',async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send({error: 'Admin not found'});

        const task = await Task.findById(req.params.appID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        const isValidated = validator.extraValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const extra = req.body.extra;
        task.extra.unshift(extra);

        task.save();

        return res.json({msg:'Attribute successfully added to the task',data:task});
    }
    catch(error) {
        return res.status(404).json({ adminnotfound: 'Admin not found' });
    }
});

// @route   PUT api/tasks/admin/edit/:id/:taskID
// @desc    Admin Edits Task
// @access  Private
router.put('/admin/:id/:taskID',async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send({error: 'Admin not found'});

        const task = await Task.findById(req.params.taskID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const fields = {};
        fields.levelOfCommitment = req.body.levelOfCommitment;
        fields.monetaryCompensation = req.body.monetaryCompensation;
        fields.experienceLevel = req.body.experienceLevel;
        fields.skills = req.body.skills.split(',');

        const updatedTask = await Task.findByIdAndUpdate(req.params.taskID,{$set: fields});
        return res.json({msg:'Task was updated successfully', data: updatedTask});
    }
    catch(error) {
        return res.status(404).json({ adminnotfound: 'Admin not found' });
    }
});


// @route   DELETE api/tasks/admin/delete/:id/:taskID
// @desc    Admin Deletes Task
// @access  Private
router.delete('/admin/delete/:id/:taskID',async(req,res)=>{
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send({error: 'Admin not found'});

        const task = await Task.findById(req.params.taskID);
        if (!task) return res.status(404).send({error: 'Task not found'});

        const deletedTask = await Task.findByIdAndRemove(taskID);

        res.json({msg:'Task Successfully deleted', data: deletedTask})
    }
    catch(error) {
        return res.status(404).json({ adminnotfound: 'Admin not found' });
    }
});


// @route   POST api/tasks/consultant/post/:id/:appID
// @desc    Consultant Posts a Task
// @access  private
router.post('/consultant/:id/:appID',async(req,res)=>{
    try {
        const consultant = await Consultant.findById(req.params.id);
        if (!consultant) return res.status(404).send({error: 'Consultant not found'});

        const application = await Application.findById(req.params.appID);
        if (!application) return res.status(404).send({error: 'Application not found'});

        const isValidated = validator.postValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        if(!application.needConsultancy){
            return res.status(400).json({Unauthorized: 'This Partner is not responsible for this task'});
        }

        if(!application.reviewed){
            return res.status(400).json({error: 'This Application has not been reviewed yet '});
        }

        if(application.partner != req.params.id){
            return res.status(400).json({ Unauthorized: 'This Partner is not responsible for this Application' });
        }

        const fields = {};
        fields.application = req.params.appID;
        fields.levelOfCommitment = req.body.levelOfCommitment;
        fields.monetaryCompensation = req.body.monetaryCompensation;
        fields.experienceLevel = req.body.experienceLevel;
        fields.skills = req.body.skills.split(',');

        for(let applicant of application.applicants){
            if(applicant.status=='accepted'){
                fields.consultant = applicant;
            }
        }

        const newTask = await Task.create(fields);
        return res.json({msg:'Task was created successfully', data: newTask});
    }
    catch(error) {
        return res.status(404).json({ consultantnotfound: 'Consultant not found' });
    }
});


// @route   PUT api/tasks/consultant/respond/:id/:id2/:id3
// @desc    Consultant Responds to Member Applications
// @access  Private
router.put('/consultant/respond/:id/:id2/:taskID',async(req,res)=>{
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).send({error: 'Member not found'});

        const consultant = await consultant.findById(req.params.id2);
        if (!consultant) return res.status(404).send({error: 'Consultant not found'});

        const task = await Task.findById(req.params.taskID).populate('application');
        if (!task) return res.status(404).send({error: 'Task not found'});

        if(!task.application.needConsultancy){
            return res.status(400).json({Unauthorized: 'This Task can Only be posted by Partner'});
        }

        if(task.consultant != req.params.id2){
            return res.status(400).json({Unauthorized: 'This Consultant is not responsible for this task'});
        }

        const isValidated = validator.respondValidation(req.body);
        if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

        const applicant = task.applicants.find(element => {
            return element.member == req.params.id;
        });

        if(!applicant) return res.status(404).json({error:'This Member did not apply for This Task'});

        applicant.status = req.body.response;

        task.save();

        return res.json({msg:'Response Saved',data:task});
    }
    catch(error) {
        return res.status(404).json({ membernotfound: 'Member not found' });
    }
});

module.exports = router;