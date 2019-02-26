const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// @route   GET api/profiles/test
// @desc    Tests profiles route
// @access  Public
const User = require('../../models/User')
router.get('/test', (req,res)=>{
    res.json({msg: 'profiles works'});
})

module.exports = router;
