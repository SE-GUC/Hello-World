
const express = require('express')
const router = express.Router()

const Admin = require('../../models/Admin')

router.get('/', (req,res) => res.json({data: 'admin working'}))

router.post('/register', async (req,res) => {
    const { name }  = req.body
    const admin = await Admin.findOne({email})
    if(admin) return res.status(400).json({error: '2 admins with same name'})

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newUser = new User({
        name,
        password: hashedPassword ,
        email,
        age
    })
    newUser
        .save()
        .then(user => res.json({data: user}))
        .catch(err => res.json({error: 'Can not create user'}))
})

module.exports = router