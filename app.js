const express = require('express');
const app = express();


const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const profiles = require('./routes/api/profiles');
const applications = require('./routes/api/applications');
const masterclasses = require('./routes/api/masterclasses');


app.get('/',(req,res)=>{
    res.send('Hello World');
});


// Use Routes
app.use('/api/users',users);
app.use('/api/tasks',tasks);
app.use('/api/profiles',profiles);
app.use('/api/masterclasses',masterclasses);
app.use('/api/applications',applications);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running On Port ${port}`);
})

