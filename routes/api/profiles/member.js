

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Task = require('../../../models/Task');
const Masterclass = require('../../../models/Masterclass');


// Validation
const validator = require('../../../validation/memberValidation');
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

router.post('/create/:id',async(req,res)=>{
    try{
        const { name, age, email, phone}  = req.body
    const id = req.params.id
    const user1 =await User.findById(id)
    
    if(!user1) return res.status(400).json({profile: 'User Does Not Exist'});
   // const isValidated = validator.createValidation(req.body);
   // if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
        
      const member1 = new Member({
         name,
        email,
        phone,
        age,
        user:id    })
    member1.save()
    res.json({msg:'Created',data:member1})
      }   
    catch(err){
        console.log(err)
    }
});

// @route PUT api/profiles/member/edit/:id
// @desc Edit Member's Profile
// @access private
router.put('/edit/:id',async(req,res)=>{
    const {name,age,phone,email} = req.body
    const id = req.params.id;
    const member1 =await Member.findById(id)
    if(!member1){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.UpdateValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
       
     member1.name = req.body.name;
        member1.age = req.body.age;
        member1.email = req.body.email;
        member1.phone = req.body.phone;
        Member.findOneAndUpdate({id}, {$set:member1},{new: true},function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }  console.log(doc);
        })
                 res.json({msg: 'updated',data: member1})
        
                        })


// @route POST api/profiles/member/skills/add/:id
// @desc Adds A Skill To Member's Profile
// @access private
router.post('/skills/add/:id',(req,res)=>{
  try{  const skill = req.body.skill;
    const id = req.params.id;
    const member = Member.findById(id)
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.skillValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            member.skills.push({skill}) 
    Member.findOneAndUpdate({id},{$set:member1},{new: true})
    res.json(member.setOfSkills)}

catch(err){
    console.log(err)
}
    
});

// @route POST api/profiles/member/interests/add/:id
// @desc Adds Interest To Member's Profile
// @access private
router.post('/Interests/add/:id',(req,res)=>{
    const interest = req.body.interest;
    const id = req.params.id;
    const member = Member.findById(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.createValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    }})
    member.interests.push(interest);
    Member.findOneAndUpdate(
        {id},
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

    const member1 = members.findById(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.createValidation(req.body);
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
    const member = members.findById(memberID)
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
    const member = Member.findById(id)
    .then(member=>{
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' });
        const isValidated = validator.createValidation(req.body);
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
    const member = Member.findById(memberID)
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