const express = require('express');
const router = express.Router();


// @route   GET api/masterclasses/test
// @desc    Tests masterclasses route
// @access  Public
router.get('/test', (req,res)=>{
    res.json({msg: 'masterclasses works'});
})

module.exports = router;
