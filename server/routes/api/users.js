
const express = require('express');
const router = express.Router();

// Load Models
const Admin = require('../../models/Admin');
const User = require('../../models/User');


// To Be Used For Register & Login


// Basic Implementation For Register For Testing Purposes
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
            res.json({msg: 'User created successfully', data: newUser})
        }
        catch (e) {
            res.status(404).json(err)
        }
})

router.post('/admin/:id',async (req,res)=>{
    const name = req.body.name;
    const user = req.params.id;
    try {
        const newAdmin = await Admin.create({
            name,
            user
        });
        res.json({msg: 'Admin created successfully', data: newAdmin})
    }
    catch (err) {
        res.status(404).json(err)
    }
})


module.exports = router;

