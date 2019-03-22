
const express = require('express');
const router = express.Router();

// Load Models
const Admin = require('../../models/Admin');

// To Be Used For Register & Login


// Basic Implementation For Register & Login
router.post('/register',async (req,res)=>{
        const username = req.body.username;
        const password = req.body.password;
        if(!username) return res.status(404).json('NO USERNAME');
        if(!password) return res.status(404).json('NO PASSWORD');
        try {
            const newUser = await User.create({
                username: username,
                password: password
            });
            res.json({msg: 'User was created successfully', data: newUser})
        }
        catch (e) {
            res.status(404).json(err)
        }
})


module.exports = router;

