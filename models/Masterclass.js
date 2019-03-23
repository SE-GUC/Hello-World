const mongoose = require('mongoose');
const Schema = mongoose.Schema
<<<<<<< HEAD
const MasterclassSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required: true
    },
    requests: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'members'
            },
            status: {
                type: String,
                default: 'pending'
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: String,
        default: Date.now()
    }
})

module.exports = Masterclass = mongoose.model('masterclass',MasterclassSchema);
=======
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
>>>>>>> dfc52c7bc7d53c92f0163fcd9f82d43a7b1acf20
