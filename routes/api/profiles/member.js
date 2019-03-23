

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
    Member.findById(id)
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
router.put('/edit/:id',async(req,res)=>{try{
    const {name,age,phone,email} = req.body
    const member1 =await Member.findById(req.params.id) 
    if(!member1){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.UpdateValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            await Member.findOneAndUpdate(req.params.id, {$set:{name,age,email,phone}},{new:true})
            const member2 =await Member.findById(req.params.id)
                 res.json({msg: 'updated',data: member2})
    }
    catch(err){
        console.log(err)
    }
                        })


// @route POST api/profiles/member/skills/add/:id
// @desc Adds A Skill To Member's Profile
// @access private
router.post('/skills/add/:id',async(req,res)=>{
  try{ const skill = req.body.skill;
    const id = req.params.id;
    const member =await Member.findById(id)
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.skillValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            member.skills.push(skill) 
   member.save()
    res.json(member.skills)}

catch(err){
    console.log(err)
}
    
});

// @route POST api/profiles/member/interests/add/:id
// @desc Adds Interest To Member's Profile
// @access private
router.post('/Interests/add/:id',async(req,res)=>{
    try{const interest = req.body.interest;
    const id = req.params.id;
    const member =await Member.findById(id)
  
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.interestsValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
    member.interests.push(interest);
        member.save()
        res.json({data:member})
    }
    catch(err){
        console.log(err)
    }
});

// @route POST api/profiles/member/past-events/add/:id
// @desc Adds Past Event To Member's Profile
// @access private
router.post('/past-events/add/:id',async(req,res)=>{
  try{  const {title,description,date,location} = req.body;
    const id = req.params.id;

    const member1 =await Member.findById(id)
 
    if(!member1){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.eventValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    
   
    const pastEvent = {
        title,
        description,
        date,
        location
    };
    member1.pastEvents.push(pastEvent);
    member1.save()
    res.json(member1.pastEvents);
  }
  catch(err){
      console.log(err)
  }
});


// @route POST api/profiles/member/tasks-completed/add/:id/:id2
// @desc Adds Completed Task To Member's Profile
// @access private
router.post('/tasks-completed/add/:id/:id2',async(req,res)=>{
   try{ const memberID = req.params.id;
    const taskID = req.params.id2;
    const member =await Member.findById(memberID)
      if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
    const task =await Task.findById(taskID) 
    if(!task){
        return res.status(400).json({ profile: 'There is no such Task' })}
   
    
        
        for(let applicant of task.applicants){
            if(applicant.member == member ){
                member.tasksCompleted.push(task);
                member.save()
                return res.json({data:member});
            }
        }
}
catch(err){console.log(err)}
});

// @route POST api/profiles/member/certificates/add/:id
// @desc Adds Certificates To Member's Profile
// @access private
router.post('/certificates/add/:id',async(req,res)=>{
    try{const {title,date,entity,description} = req.body;
    const id = req.params.id;
    const member =await Member.findById(id)
   
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
        const isValidated = validator.certificatesValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    const certificate = {
        title,
        date,
        entity,
        description
    };
    member.certificates.push(certificate);
    member.save()
    res.json({data:member});
    }
    catch(err){
        console.log(err)
    }
});

// @route POST api/profiles/member/masterclasses/add/:id/:id2
// @desc Adds Masterclass To Member's Profile
// @access private
router.post('/masterclasses/add/:id/:id2',async(req,res)=>{
   try{ const memberID = req.params.id;
    const masterclassID = req.params.id2;
    const member =await Member.findById(memberID)
   
    if(!member){
        return res.status(400).json({ profile: 'There is no Member profile for this user' })}
    const masterclass = Masterclass.findById(masterclassID)
  
    if(!masterclass){
        return res.status(400).json({ profile: 'There is no such Masterclass' })}
    for(let applicant of masterclass.applicants){
        if(applicant.member == member ){
            member.masterclasses.push(masterclass);
            member.save()
            return res.json(member);
        }
    }}
    catch(err){
        console.log(err)
    }
});


// @route DELETE api/profiles/member/delete/:id
// @desc Delete Member's Profile
// @access private
router.delete('/delete/:id',async(req,res) => {
      try{  const member = await Member.findById(req.params.id)
            if(!member){
                return res.status(404).json({ profile: 'There is no Member profile for this user' })}
            await Member.findByIdAndRemove(req.params.id)
                res.json({msg:'deleted'})
            }
            catch(err){
                console.log(err)
            }
    
});


module.exports = router;