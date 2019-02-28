const express = require('express');
const router = express.Router();
const Masterclass = require('../../models/Masterclass');
const User = require ("../../models/User");
const Member = require("../../models/Member")

const classes = [
    new Masterclass('The Prince',1),
    new Masterclass('hawdfa',2)
];

const members = [
    new Member("moataz",1,1)
];
    

const users = [
      new User('The Prince',24,2)
   ];



// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'users works'});
})

//showing classes
router.get('/showclasses', (req, res) => res.json({ data: classes }));

// member applying for a masterclass
router.post('/apply/:id/:id2',(req,res)=>{
    const memberid = req.params.id;
    const classid = req.params.id2;

    const masterclass = classes.find(element => {
        return element.id == classid;
    });
    const member = members.find(element => {
        return element.id == memberid;
     });
    if (!masterclass) return res.status(404).json({profile: 'there is no such master class'})
    if (!member) return res.status(404).json({profile: 'there is no such member'})
    
    const applicant ={member}
    const mclass ={masterclass}

    masterclass.applicants.push(applicant.member.id);
    member.masterclasses.push(mclass);
    return res.json({data : masterclass , member})
  
});



module.exports = router;
