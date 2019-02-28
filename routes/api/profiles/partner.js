const express = require('express');
const router = express.Router();
const uuid = require('uuid');


//Load Models
const Partner = require('../../../models/Partner');
const Organization = require('../../../models/Organization');
const User = require('../../../models/User');

// Temporary Data
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
];

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


// @route   POST api/profiles/partner/create/:id
// @desc    Creates Partner Profile
// @access  Private
router.post('/create/:id', (req,res)=>{
    const id = req.params.id;
    const fieldOfWork = req.body.fieldOfWork;

    if (!fieldOfWork) return res.status(400).send({ err: 'Field Of Work field is required' });
    if (typeof fieldOfWork !== 'string') return res.status(400).send({ err: 'Invalid value for Field Of Work' });
    const organization = organizations.find(element => {
        return element.id == id;
    });
    if(!organization){
        return res.status(404).json({ profile: 'There is no Organization profile for this user' });
    }


    const newPartner = {
        fieldOfWork,
        id
    };
    partners.push(newPartner);
    return res.json({ data: newPartner });
});


// @route   GET api/profiles/partner/:id
// @desc    Get Partner's profile by ID
// @access  private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(404).json({ profile: 'There is no Partner profile for this user' });
    }
    else{
        return res.json({data: partner});
    }

});


// @route   PUT api/profiles/partner/edit/:id
// @desc    Edit Partner's Profile
// @access  Private
router.put('/edit/:id',(req,res)=>{
    const fieldOfWork = req.body.fieldOfWork;
    const id = req.params.id;

    if (!fieldOfWork) return res.status(400).send({ err: 'Field Of Work field is required' });
    if (typeof fieldOfWork !== 'string') return res.status(400).send({ err: 'Invalid value for Field Of Work' });

    const partner = partners.find(element => {
        return element.id == id;
    });
    if(!partner){
        return res.status(404).json({ profile: 'There is no profile for this user' });
    }
    else{
        partner.fieldOfWork = fieldOfWork;
        return res.json({data: partner});
    }

});


// @route   DELETE api/profiles/partner/delete/:id
// @desc    Delete Partner's Profile
// @access  Private
router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    const partner = partners.find(element => {
        return element.id == id;
    });
    partners.splice( partners.indexOf(partner), 1 );
    if(!partner){
        return res.status(404).json({ profile: 'There is no Partner profile for this user' });
    }
    else{
        return res.json({data: partners});
    }
});

module.exports = router;