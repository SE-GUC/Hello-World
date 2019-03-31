const express = require('express');
const router = express.Router();


//Load Models
const User = require('../../../models/User');
const Member = require('../../../models/Member');
const Expert = require('../../../models/Expert');

const validator = require('../../../validation/memberValidation');

router.post('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({error: 'User does not exist'});

        //console.log("1");

        // const isValidated = validator.createValidation(req.body);
        // if (isValidated.error) return res.status(400).send({error: isValidated.error.details[0].message});


        //console.log("2");

        const memberID = await Member.findById(req.body.member);

        //console.log("3");

        const expertBody = {};
        expertBody.member = memberID;

        console.log(expertBody);

        const newExpert = await Expert.create(expertBody);
        return res.json({msg: 'Expert was created successfully', data: newExpert});

    }
    catch (err) {
        res.status(404).json({ usernotfound: 'User not found' })
        console.log(err)
    }
});



router.get('/:id',async(req,res)=>{
    try {
        const expert = await Expert.findById(req.params.id);
        if (!expert) return res.status(404).send({error: 'Expert not found'})
        return res.json({data: expert})
    }
    catch (error) {
        return res.status(404).json({ expertnotfound: 'Expert not found' });
    }
});

module.exports = router;