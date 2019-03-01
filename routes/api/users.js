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

module.exports = router;