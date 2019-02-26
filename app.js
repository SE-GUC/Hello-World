const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const partner = require('./routes/api/profiles/partner');
const consultant = require('./routes/api/profiles/consultant');
const education = require('./routes/api/profiles/education');
const applications = require('./routes/api/applications');
const masterclasses = require('./routes/api/masterclasses');


app.get('/',(req,res)=>{
    res.send('Hello World');
});


// Use Routes
app.use('/api/users',users);
app.use('/api/tasks',tasks);
app.use('/api/profiles/partner',partner);
app.use('/api/profiles/consultant',consultant);
app.use('/api/profiles/education',education);
app.use('/api/masterclasses',masterclasses);
app.use('/api/applications',applications);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running On Port ${port}`);
})

