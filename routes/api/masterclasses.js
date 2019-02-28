const express = require('express');
const router = express.Router();


// @route   GET api/masterclasses/test
// @desc    Tests masterclasses route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'masterclasses works'});
});


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
