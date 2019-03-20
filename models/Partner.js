const mongoose = require('mongoose');
const Schema = mongoose.Schema
partnerschema = new Schema({
    partners:[{
        type:Schema.Types.ObjectId,
            ref: 'partners',
    }],
    boardMembers:[{
        type:schema.Types.ObjectId,
        ref:'partners',
    }],
    events:[
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            location: {
                type: String
            }
        }
    ],
    fieldOfWork:{
        type:String,
        required:true
        },
    pastProjects:[
        {
            description:{
                type:String,
                required: true
            },
            link:{
                type:String,
                required:true
            },
            rating:{
                type:BigInt,
                required:true
            }
        }
    ],
    feedback:[{
        type:String,
        required:true
    }]
})


module.exports = Partner = mongoose.model('partners',partnerschema);