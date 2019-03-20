const mongoose = require('mongoose');
const Schema = mongoose.Schema
masterclassschema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    applicants:[{

    }]

})

module.exports = Masterclass =mongoose.model('masterclasses',masterclassschema);
