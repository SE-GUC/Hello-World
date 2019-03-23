const mongoose = require('mongoose')
const Schema = mongoose.Schema
const consultantSchema = new Schema({
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'organization'
    },
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
                required: true
            }
        }
    ],
    partners: {
        type: [Schema.Types.ObjectId],
        ref: 'partner'
    },
    reports: {
        type: [String]
    },
    // applications: {
    //     type: [String],
    //     required: true
    // },
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = Consultant = mongoose.model('consultant',consultantSchema);