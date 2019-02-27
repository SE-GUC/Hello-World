const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const User = require('../../models/User');
const Organization = require('../../models/organization');
const Member = require('../../models/Member');

//temp data
const users =
    [new User("sad",123,1415),
     new User("asd",231,414)
    ]
const organizations = [
    new Organization("7mada", 11,1),
    new Organization("bom", 123,2)
]
const members = [
    new Member("ba", 11, 123),
    new Member("as", 123, 141)];


// @route   get api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: 'users works'});
})
// @route post api/users/addtoorgan/:id
// @decs adding user to organziation array
// @access private
router.post('/addtoorgan/:id',(req,res)=>{
    const name = req.body.name;
    const id = req.params.id;
    const age = req .body.age;
    const organadd = new Organization(
        name,
        age,
        id
    );
    if(!users) return res.status(404).json({profile: 'you are not a user yet'});
    else{
        organizations.push(organadd);
        return res.json({data: organadd});
    }

});
// @route post api/users/addtomemeber/:id
// @decs adding user to organziation array
// @access private
router.post('/addtomember/:id',(req,res)=>{
    const name = req.body.name;
    const id = req.params.id;
    const age = req.body.age;
    const memberadd = new Member(
        id,
        name,
        age
    );
    if(!users) return res.status(404).json({profile: 'you are not a user yet'});
    else{
        members.push(memberadd);
        return res.json({data: memberadd});
    }
})
module.exports = router;