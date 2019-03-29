
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Consultant Model
const Member = require('../../../models/Member');
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');
const Consultant = require('../../../models/Consultant');
const Partner = require('../../../models/Partner');
//validator
const validator =require('../../../validation/consultantValidation');
// @route   POST api/profiles/consultant/create/:id
// @desc    Creates Consultant Profile
// @access  Private
router.post('/create/:id',async (req,res)=>{
   try{ const id = req.params.id;
    const organization =await Organization.findById(id)
    if(!organization)   
    return res.status(404).json({ profile: 'There is no Organization profile for this user' });
    const consfields ={}
    consfields.id = id;
    const consultant = await Consultant.create(consfields)
    res.json({ data: consultant });
   }
   catch(err){
       console.log(err)
   }
});


// @route   GET api/profiles/consultant/:id
// @desc    Get consultant's profile by ID
// @access  private
router.get('/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    const consultant = await Consultant.findById(id)
 
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }

   res.json({data:consultant})
}
catch(err)
{
    console.log(err)
}
});


// @route   PUT api/profiles/consultant/edit/:id
// @desc    Edit consultant's Profile
// @access  Private
router.put('/edit/:id',async(req,res)=>{
   try{ const {reports,workPosistion}= req.body
    const id = req.params.id;
    const consultant = await Consultant.findById(id)
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });}
        const isvalidated = validator.updateValidation(req.body);
        if (isvalidated.error) return res.status(400).send({error:isvalidated.error.details[0].message});
        await consultant.findOneAndUpdate(req.params.id, {$set:{reports,workPosistion}},{new:true})
        res.json({msg:'updated',data:consultant})
    }
    catch(err){
        console.log(err)
    }
    });


// @route POST api/profiles/consultant/board-members/add/:id/:id2
// @decs Adds Board Member To Consultant's Profile
// @access private
router.post('/board-members/add/:id/:id2',async(req,res)=>{
   try{
    const id = req.params.id;

    const consultant = await Consultant.findById(id)
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    }
    const id2 = req.params.id2;
    const member = await Member.findById(id2)
    if(!member){
        return res.status(400).json({ profile: 'There is no member profile for this user' });
    };
    consultant.boardMembers.push(member);
    consultant.save()
    res.json({data:consultant});
   }
   catch(err){
       console.log(err)
   }
});


// @route POST api/profiles/consultant/events/add/:id
// @decs Adds Event To Consultant's Profile
// @access private
router.post('/events/add/:id',async (req,res)=>{
    try{
    const eventName = req.body.eventName;
    const description = req.body.description;
    const date = req.body.date;
    const id = req.params.id;

    const consultant = await Consultant.findById(id)
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    const isValidated = validator.eventValidation(req.body);
    if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

    const event = {
        eventName,
        description,
        date
    };
    consultant.events.push(event);
    consultant.save()
    return res.json(consultant);
    }
    catch(err){
        console.log(err)
    }
});

// @route POST api/profiles/consultant/partners/add/:id/:id2
// @decs Adds Partner to Partner's Profile
// @access private
router.post('/partners/add/:id/:id2',async (req,res)=>{
    const consultantID = req.params.id;
    const partnerID = req.params.id2;
    const consultant = await Consultant.findById(consultantID)
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };

    const partner = Partner.findById(partnerID)
    if(!partner){
        return res.status(400).json({ profile: 'There is no Partner profile for this user' });
    };
    const organization = Organization.findById(partnerID)
    if(!organization){
        return res.status(400).json({ profile: 'There is no Organization profile for this user' });
    };
    const myPartner = {
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        address: organization.address,
    };
    consultant.partners.push(myPartner);
    consultant.save()
    return res.json(consultant);
});


// @route POST api/profiles/consultant/reports/add/:id
// @decs Adds A Report To Consultant's Profiles
// @access private
router.post('/reports/add/:id',async (req,res)=>{
    const report = req.body.report;
    const id = req.params.id;
    const consultant = consultants.find(element => {
        return element.id == id;
    });
    if(!consultant){
        return res.status(400).json({ profile: 'There is no Consultant profile for this user' });
    };
    const isValidated = validator.reportValidation(req.body);
    if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});

    consultant.reports.push(report);
    consultant.save()
    return res.json(consultant);
});

// @route   DELETE api/profiles/consultant/delete/:id
// @desc    Delete consultant's Profile
// @access  Private
router.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id;
    const consultant = Consultant.findById(id)
    if(!consultant){
        return res.status(404).json({ profile: 'There is no Consultant profile for this user' });
    }
    await Consultant.findByIdAndRemove(id)
    res.json({msg:'deleted'})
});

module.exports = router;

