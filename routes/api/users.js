const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const _ = require('underscore');

const User = require('../../models/User');
const Organization = require('../../models/organization');
const Member = require('../../models/Member');

//Temporary data
const users  = [
    new User("sad",123,14),
    new User(231,"asd",15)
];
const organizations = [
    new Organization("7mada", 11,1),
    new Organization("bom", 123,2)
]
const members = [
    new Member("ba", 11, 12),
    new Member("as", 123, 14),
    new Member("sda",1,13)
];

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: 'users works'});
});


module.exports = router;