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
         type: Schema.Types.ObjectId,
        ref: 'members'
    }]

})

module.exports = Masterclass =mongoose.model('masterclasses',masterclassschema);
