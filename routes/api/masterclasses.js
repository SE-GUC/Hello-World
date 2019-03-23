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

    Masterclass.findById(id)
        .then( (newClass) => {
            if ( newClass != null ) {
                return res.status(200)
                    .json({
                        msg: "Master Class Fetched",
                        data: newClass
                    })
            } else {
                return res.status(404)
                    .json({
                        errMsg: "No such Master Class ID"
                    })
            }
        }).catch( (error) => {
            return res.status(422)
                .json({
                    errMsg: "Error Trying To Fetch Master Class",
                    err: error
                })
        })

});


// @route   POST api/masterclasses/require/:id/:id2
// @desc    Member Requires Assessment From An Expert
// @access  Private
router.post('/require',(req,res)=>{
    const memberID = req.body.memberID;
    const expertID = req.body.expertID;

    Member.findById(memberID)
        .then( (member) => {
            if( member != null ) {
                Expert.findById(expertID)
                    .then( (expert) => {
                        if( expert != null ) {
                            var request = {
                                member: memberID,
                                status: "Pending"
                            }
                            expert.requests.push(request);

                            expert.save()
                                .then( () => {
                                    return res.status(200)
                                        .json({
                                            msg: "Request Sumbitted"
                                        })
                                })
                        } else {
                            return res.status(404)
                                .json({
                                    msg: "No Such Expert Exists"
                                })
                        }
                    })
            } else {
                return res.status(404)
                    .json({
                        msg: "No Such Member Exists"
                    })
            }
        })

});



// @route   PUT api/masterclasses/respond/:id/:id2
// @desc    Expert Responds to Requests
// @access  Private
router.put('/respond/',(req,res)=>{
    const memberID = req.body.memberID;
    const expertID = req.body.expertID;

    Member.findById(memberID)
        .then((member) => {
            if (member != null){
                Expert.findById(expertID)
                    .then((expert) => {
                        if (expert != null){
                            var i = 0;
                            while(i < Expert.requests){
                                if(memberID === request.memberID){
                                    var request = {
                                        member: memberID,
                                        status: "Respond"
                                    }
                                }
                                i++;
                            }
                            //Expert.requests.find(request)
                        }
                        else {
                           return res.status(404)
                               .json({
                                   msg: "No Such Expert Exists"
                               })
                       }
                    })
            }
            else {
                return res.status(404)
                    .json({
                        msg: "No Such Member Exists"
                    })
            }

        })
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
    if (!masterclass) return res.status(404).json({masterclass: 'there is no such Masterclass'});
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
    if (!expert) return res.status(404).json({expert: 'this User is not an Expert'});

    const masterclass = masterclasses.find(element => {
        return element.id == recommendedMasterclass;
    });
    if (!masterclass) return res.status(404).json({masterclass: 'there is no Such Masterclass'});


    member.recommendedMasterclasses.push(masterclass);
    return res.json({data: member.recommendedMasterclasses});
});
module.exports = router;
