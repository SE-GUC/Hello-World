const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const member = require('./routes/api/profiles/member');
const organization = require('./routes/api/profiles/organization');
const partner = require('./routes/api/profiles/partner');
const consultant = require('./routes/api/profiles/consultant');
const education = require('./routes/api/profiles/education');
const applications = require('./routes/api/applications');
const masterclasses = require('./routes/api/masterclasses');



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(db, { useNewUrlParser: true });
client.connect(err => {
    const client = new MongoClient(db, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        console.log("MongoDB Connected");
        client.close();
    });
});


// @route   GET /home
// @desc    Home Page
// @access  public
app.get('/home',(req,res) =>{
    return res.json({msg:'Welcome To Lirten Hub'});
});

// @route   GET /about
// @desc    About Page
// @access  public

app.get('/about', (req, res) => {
    res.json({msg: 'About Us'});
});

// Use Routes
app.use('/api/users',users);
app.use('/api/tasks',tasks);
app.use('/api/profiles/member',member);
app.use('/api/profiles/organization',organization);
app.use('/api/profiles/partner',partner);
app.use('/api/profiles/consultant',consultant);
app.use('/api/profiles/education',education);
app.use('/api/masterclasses',masterclasses);
app.use('/api/applications',applications);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running On Port ${port}`);
})

