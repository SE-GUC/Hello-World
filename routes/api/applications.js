const express = require('express');
const router = express.Router();


// @route   GET api/applications/test
// @desc    Tests applications route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'applications works'});
})

module.exports = router;
