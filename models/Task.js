mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
   application:{
       type: Schema.Types.ObjectId,
       ref: 'applications'
   },
    levelOfCommitment: {
       type: Number,
        min: 1,
        max: 5
    },
    experienceLevel: {
       type: Number,
        min: 1,
        max: 5
    },
    skills: {
       type: [String],
        required: true
    },
    monetaryCompensation: {
       type: Number,
    },
    applicants: [
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
    reviewed:{
       type: Boolean,
        default: false
    },
    extra: {
       type: [String]
    },
    date: {
       type: Date,
        default: Date.now()
    },
    status: {
       type: String,
        default: 'Awaiting Reviewing'
    }
});

module.exports = Task = mongoose.model('tasks',taskSchema);