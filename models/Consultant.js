const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constructorSchema = new Schema({
     workPosition: { 
         type: String,
         required: true},
         boardMembers: [
            {
                name:{
                    type: String,
                    required: true
                },
                position:{
                    type: String,
                    required: true
                }
            }
        ],
         events:[
            {
                title:{
                    type: String,
                    required: true
                },
                description:{
                    type: String,
                    required: true
                },
                date:{
                    type: Date,
                    default: Date.now()
                }
            }
        ],
         partners: {
            type: [Schema.Types.ObjectId],
            ref: 'partner'
        },
     reports: {
         type: [String],
         required: true},
    applications: {
         type: [Schema.Types.ObjectId],
         ref:'applications'}
})




module.exports = Consultant= mongoose.model('consultants', constructorSchema)