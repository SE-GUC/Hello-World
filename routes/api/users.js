const express = require('express');
const router = express.Router();
const uuid = require('uuid');

// Load Models
const User = require('../../models/User');
const Organization = require('../../models/organization');
const Member = require('../../models/Member');
const Masterclass = require('../../models/Masterclass');

//Temporary data
const masterclasses = [
    new Masterclass('bom',1),
    new Masterclass('bs',2)
];
const users  = [
    new User(['bom','tak','aas'],"sad",123,14),
    new User(231,"asd",15)
];
const organizations = [
    new Organization("7mada", 11,1),
    new Organization("bom", 123,2)
];
const members = [
    new Member("ba", 11, 12,24,1,[12,41,14],3),
    new Member("as", 123, 14,5,5,[72,91,84],2),
    new Member("sda",1,13,14,51,[52,51,15],146)
];

const classes = [
    new Masterclass('The Prince',1),
    new Masterclass('hawdfa',2)
];

// @route get api/users/viewrecMC/:id
router.get('/viewrecMC/:id',(req,res)=>{
    const id = req.params.id;
    let i = 0;
    while(i<members.length){
        if(members[i].id == id){
            res.json({data:members[i].rmasterc});
            break;
        }
    }

});


// @route get api/users/addRMC/:ID1/:ID2
router.put('/addRMC/:ID1/:ID2',(req,res) =>{
const id1 = req.params.ID1;
const id2 = req.params.ID2;
const rmasterc = req.body.rmasterc;
const member = members.find(element =>{
    return element.id = id2;
});
if(!member){
    res.status(404).json({ profile: 'There is no Member profile for this user' });
}
else{
const index = members.indexOf(member);
members[index].rmasterc.push(rmasterc);
res.json({data: members[index.rmasterc]});
}
});

module.exports = router;