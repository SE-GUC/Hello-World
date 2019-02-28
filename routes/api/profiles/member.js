const express = require('express');
const router = express.Router();
const uuid = require('uuid');

//Load Models
const Member = require('../../../models/Member');
const User = require('../../../models/User');

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

// @route GET api/users/member/:id
// @decs Get Member's Profile by ID
// @access private
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const member = members.find(element => {
        return element.id == id;
    });
    if(!member) return res.status(404).json({profile: 'There is no Member profile for this user'});
    else {
        return res.json({data: member});
    }
});


// @route post api/users/member/create/:id
// @decs Creates Member Profile
// @access private
router.post('/create/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });

    const user = users.find(element => {
        return element.id == id;
    });

    if(!user) return res.status(404).json({profile: 'User Does Not Exist'});
    const member = new Member(
        name,
        age,
        email,
        phone,
        user.id
    );
    members.push(member);
    return res.json({data: member});
});

// @route PUT api/users/member/edit/:id
// @decs Edit Member's Profile
// @access private
router.put('/edit/:id',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!age) return res.status(400).send({ err: 'age field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (typeof name !== 'string') return res.status(400).send({err: 'Invalid value for name'});
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    if (isNaN(age)) return res.status(400).send({err: 'Invalid value for age'});

    const member = members.find(element => {
        return element.id == id;
    });
    if(!member){
        return res.status(404).json({ profile: 'There is no Member profile for this user' });
    }
    else {
        member.name = name;
        member.age = age;
        member.email = email;
        member.phone = phone;

        return res.json({data: members});
    }
});


// @route DELETE api/users/member/delete/:id
// @decs Delete Member's Profile
// @access private
router.delete('/delete/:id',(req,res) => {
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

module.exports = router;
