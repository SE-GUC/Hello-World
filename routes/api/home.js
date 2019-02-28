const express = require('express');
const router = express.Router();
// @route   GET api/home/home
router.get('/home1',(req,res) =>{
res.json({msg:'homeworks'});

});
// @route   GET api/home/about
router.get('/about', (req, res) => {
    res.json({msg: 'about works'});
});
module.exports = router;