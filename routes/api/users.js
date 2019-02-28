const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const User = require('../../models/User');
const Organization = require('../../models/organization');
const Member = require('../../models/Member');

//temp data
const users =
    [new User("sad",123,1415),
     new User(231,"asd",414)
    ]
const organizations = [
    new Organization("7mada", 11,1),
    new Organization("bom", 123,2)
]
const members = [
    new Member("ba", 11, 123),
    new Member("as", 123, 141),
    new Member("sda",1,1)
];


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
//create new user profile (should be member but will do later on)
router.post('/pofilecreation',(req,res)=>{
    const name = req.body.name;
    const id = uuid.v4();
    const age = req.body.age;
    const newUser = new User(
        id,
        name,
        age
    );
    users.push(newUser);
    return res.json({data: newUser});
})
//show memeber profile
router.get('/profilemembers/:id',(req,res)=>{
    const id = req.params.id;
    const member1 = members.find(element => {
        return element.id == id;
    });
    if(!member1) return res.status(404).json({profile: 'There is no  profile for this user'});
    else {
        return res.json({data: members});
    }
})
//edit page
router.put('/profilemembersedit/:id',(req,res)=>{
    const Idr = request.params.id;
    let member1 = members.filter(member1 => {
        return member1.id = Idr;
    })[0];
    const index = members.indexOf(member1);
    const keys = Object.keys(request.body);
    keys.forEach(key => {
        member1[key] = req.body[key];
    });
    members[index] = member1;
    Response.json(members[index]);
});
router.delete('/deletemember/:id',(req,res) =>{
const id = req.param.id;
let member = members.filter(member =>{
    return member.id == id;
})[0];
const index = members.indexOf(member);
members.splice(index,1);
res.json({massage :'Member ${id} deleted.'});
});
router.get('/showmem',(req,res)=>{
    res.json({data:members});
});
module.exports = router;