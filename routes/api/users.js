const express = require('express');
const router = express.Router();
const uuid = require('uuid');


const User = require('../../models/User');
const Organization = require('../../models/organization');
const Member = require('../../models/Member');
const Masterclass = require('../../models/Masterclass');

//Temporary data
const masterclasses = [
    new Masterclass('bom',1),
    new Masterclass('bs',2)
]
const users  = [
    new User(['bom','tak','aas'],"sad",123,14),
    new User(231,"asd",15)
];
const organizations = [
    new Organization("7mada", 11,1),
    new Organization("bom", 123,2)
]
const members = [
    new Member("ba", 11, 12,24,1,[12,41,14],3),
    new Member("as", 123, 14,5,5,[72,91,84],2),
    new Member("sda",1,13,14,51,[52,51,15],146)
];


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: 'users works'});
});

// @route POST api/users/create/organization/:id
// @decs Creates an Organization Profiles
// @access private
router.post('/create/organization/:id',(req,res)=>{
    const name = req.body.name;
    const id = req.params.id;
    const age = req.body.age;
    const organization = new Organization(
        name,
        age,
        id
    );
    const user = users.find(element => {
        return element.id == id;
    });
    if(!user) return res.status(404).json({profile: 'User Does not exist'});
    else{
        organizations.push(organization);
        return res.json({data: organization});
    }

});

// @route post api/users/member/create/:id
// @decs Creates Member Profile
// @access private
router.post('/member/create/:id',(req,res)=>{
    const name = req.body.name;
    const id = req.params.id;
    const age = req.body.age;
    const member = new Member(
        name,
        age,
        uuid.v4()
    );
    const user = users.find(element => {
        return element.id == id;
    });
    if(!user) return res.status(404).json({profile: 'User Does Not Exist'});
    else{
        members.push(member);
        return res.json({data: member});
    }
});


// @route GET api/users/member/:id
// @decs Get Member's Profile by ID
// @access private
router.get('/member/:id',(req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member) return res.status(404).json({profile: 'There is no  profile for this user'});
    else {
        return res.json({data: member});
    }
});

// @route PUT api/users/member/edit/:id
// @decs Edit Member's Profile
// @access private
router.put('/member/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        res.status(404).json({ profile: 'There is no Member profile for this user' });
    }
    else {
        member.name = name;
        member.age = age;

        if (!name) return res.status(400).send({err: 'Name field is required'});
        if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
        if (!age) return res.status(400).send({err: 'Age field is required'});
        if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});

        return res.json({data: member});
    }
});


// @route PUT api/users/member/edit/:id
// @decs Edit Member's Profile
// @access private
router.delete('/member/delete/:id',(req,res) => {
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });

    members.splice( members.indexOf(member), 1 );
    if(!member){
        return res.status(404).json({ profile: 'There is no Member profile for this user' });
    }
    else{
        return res.json({data: members});
    }
});
// @route get api/users/viewrecMC/:id
router.get('/viewrecMC/:id',(req,res)=>{
    const id = req.param.id;
    const member = members.find(element => {
        return element.id == id;
    });
    const i = members.indexOf(member);
    const a = members[i].RMC;
    return res.json({data:members[i].RMC});
});
// @route get api/users/addRMC/:ID1/:ID2
router.put('/addRMC/:ID1/:ID2',(req,res) =>{
const id1 = req.params.ID1;
const id2 = req.params.ID2;
const rmcs = req.body.rmcs;
const member = members.find(element =>{
    return element.id = id2;
});
if(!member){
    res.status(404).json({ profile: 'There is no Member profile for this user' });
}
else{
const index = members.indexOf(member);
members[index].RMC.push(rmcs);
res.json({data: members[index.RMC]});
}
}
);
module.exports = router;