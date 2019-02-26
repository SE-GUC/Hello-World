const express = require('express');
const router = express.Router();
const uuid = require('uuid');


//Load Partner Model
const Partner = require('../../../models/Partner');

// Temporary Data
const partners = [
    new Partner('Karim Hisham', 45, 1),
    new Partner('Karem Hesham', 35, 2),
    new Partner('Kareem Hisham', 40, 3),
    new Partner('The Kareem Hisham', 21, 4),
    new Partner('The Karim Hisham', 90, 5),
];


// @route   GET api/profiles/partner/all
// @desc    Gets All Partner Profiles
// @access  Public
router.get('/all', (req,res)=>{
    res.json({data: partners});
})


// @route   POST api/profiles/partner/create
// @desc    Creates Partner Profile
// @access  Private
router.post('/create', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;

    const errors = {};


    if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    if (!age) return res.status(400).send({ err: 'Age field is required' });
    if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });



    const newPartner = {
        name,
        age,
        id: uuid.v4()
    };
    partners.push(newPartner);
    return res.json({ data: newPartner });
});


// @route   GET api/profiles/partner/:partner_id
// @desc    Get Partner's profile by ID
// @access  Public
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        res.json({data: partner});
    }

});


// @route   POST api/profiles/partner/edit/:partner_id
// @desc    Edit Partner's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        partner.name = name;
        partner.age = age;

        if (!name) return res.status(400).send({ err: 'Name field is required' });
        if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
        if (!age) return res.status(400).send({ err: 'Age field is required' });
        if (isNaN(age)) return res.status(400).send({ err: 'Invalid value for age' });


        return res.json({data: partner});
    }

});


// @route   DELETE api/profiles/partner/delete/:partner_id
// @desc    Delete Partner's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    partners.splice( partners.indexOf(partner), 1 );
    if(!partner){
        return res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        return res.json({data: partners});
    }
});

module.exports = router;