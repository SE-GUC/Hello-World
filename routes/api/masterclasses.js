const express = require('express');
const router = express.Router();

//Load Models
const Member = require('../../models/Member');
const User = require('../../models/User');
const Masterclass = require('../../models/Masterclass');
const Expert = require('../../models/Expert');

// Temporary Data
const users = [
    new User('karim13','karimPassword',1),
    new User('youssef12','youssefPassword',2),
    new User('moataz11','moatazPassword',3),
    new User('kashlan10','kashlanPassword',4),
];

const members = [
    new Member('Karim', 21, 'Karim@mail.com', 10, 1),
    new Member('Youssef', 65, 'youssef@mail.com', 11, 2),
    new Member('Moataz', 25, 'moataz@mail.com', 12, 3),
    new Member('Kashlan', 13, 'kashlan@mail.com', 13, 4),
];

const masterclasses = [
    new Masterclass('Javascript', 'Master Javascript in 10 Days!', 1),
    new Masterclass('Python', 'From Zero To Hero - Become A Python Expert', 2),
    new Masterclass('React', 'React Course For Complete Beginners', 3)
];

const experts = [
    new Expert(1),
    new Expert(2)
];

// @route   GET api/masterclasses/all/:id
// @desc    View Masterclasses
// @access  Private
router.get('/all/:id',(req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member) return res.status(404).json({profile: 'There is no Member Profile For This User'});
    return res.json({data: masterclasses});
});

// @route   POST api/masterclasses/require/:id/:id2
// @desc    Member Requires Assessment From An Expert
// @access  Private
router.post('/require/:id/:id2',(req,res)=>{
    const memberID = req.params.id;
    const expertID = req.params.id2;
    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(404).json({profile: 'There is no Member Profile For This User'});

    const expert = experts.find(element => {
        return element.id == expertID;
    });
    if(!expert) return res.status(404).json({profile: 'This User is not An Expert'});

    const request = {
        member,
        status: 'pending'
    };

    expert.requests.push(request);
    return res.json({data: expert.requests});
});


// @route   PUT api/masterclasses/respond/:id/:id2
// @desc    Expert Responds to Requests
// @access  Private
router.put('/respond/:id/:id2',(req,res)=>{
    const response = req.body.response;
    const memberID = req.params.id;
    const expertID = req.params.id2;
    const member = members.find(element => {
        return element.id == memberID;
    });
    if(!member) return res.status(404).json({profile: 'There is no Member Profile For This User'});

    const expert = experts.find(element => {
        return element.id == expertID;
    });
    if(!expert) return res.status(404).json({profile: 'This User is not An Expert'});

    if(!response) return res.status(404).json({err: 'Response Field is Required'});

    const request = expert.requests.find(element => {
        return element.member = member;
    });
    if(!request) return res.status(404).json({profile: 'There is no Request by this User'});

    request.status = response;

    if(request.status=='accepted'){
        member.notifications.push(`Your Request has been accepted by Expert ${expertID}`);
    }
    return res.json({data: request});
});


// @route   POST api/masterclasses/apply/:id/:id2
// @desc    Member Apply For a Masterclass
// @access  Private
router.post('/apply/:id/:id2',(req,res)=>{
    const memberID = req.params.id;
    const masterclassID = req.params.id2;

    const masterclass = masterclasses.find(element => {
        return element.id == masterclassID;
    });
    const member = members.find(element => {
        return element.id == memberID;
    });
    if (!masterclass) return res.status(404).json({profile: 'there is no such Masterclass'});
    if (!member) return res.status(404).json({profile: 'there is no Member Profile for this User'});

    const applicant ={member};

    masterclass.applicants.push(applicant.member.id);
    member.masterclasses.push(masterclass);
    return res.json({data : masterclass })

});

// @route   GET api/masterclasses/recommended/:id
// @desc    Member View his Recommended Masterclasses
// @access  Private
router.get('/recommended/:id',(req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if (!member) return res.status(404).json({profile: 'there is no Member Profile for this User'});
    return res.json({data: member.recommendedMasterclasses});
});

// @route   PUT api/masterclasses/assess/:id/:id2
// @desc    Expert Assess Member
// @access  Private
router.put('/assess/:id/:id2',(req,res)=>{
    const memberID = req.params.id;
    const expertID = req.params.id2;
    const recommendedMasterclass = req.body.masterclass;
    const member = members.find(element => {
        return element.id == memberID;
    });
    if (!member) return res.status(404).json({profile: 'there is no Member Profile for this User'});

    const expert = experts.find(element => {
        return element.id == expertID;
    });
    if (!expert) return res.status(404).json({profile: 'this User is not an Expert'});

    const masterclass = masterclasses.find(element => {
        return element.id == recommendedMasterclass;
    });
    if (!masterclass) return res.status(404).json({profile: 'there is no Such Masterclass'});


    member.recommendedMasterclasses.push(masterclass);
    return res.json({data: member.recommendedMasterclasses});
});
module.exports = router;
