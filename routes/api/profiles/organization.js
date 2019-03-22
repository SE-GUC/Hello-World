/*
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

// Load Models
const User = require('../../../models/User');
const Organization = require('../../../models/Organization');

//Temporary data
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

// @route POST api/users/organization/create/:id
// @decs Creates an Organization's Profile
// @access private
router.post('/create/:id',(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;
    const id = req.params.id;

    if (!name) return res.status(400).send({ err: 'name field is required' });
    if (!email) return res.status(400).send({ err: 'email field is required' });
    if (!address) return res.status(400).send({ err: 'address field is required' });
    if (!phone) return res.status(400).send({ err: 'phone field is required' });
    const organization = new Organization(
        name,
        address,
        email,
        phone,
        id
    );
    const user = users.find(element => {
        return element.id == id;
    });
    if(!user) return res.status(404).json({profile: 'User Does not exist'});
    organizations.push(organization);
    return res.json({data: organization});
});
 module.exports = router;
*/