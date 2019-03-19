mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
   application:{
       type: Object.Types.ObjectId,
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
                type: Object.Types.ObjectId,
                ref: 'members'
            },
            status: {
                type: String,
                default: 'pending'
            }
        }
    ],
    reviewed:{
       type: Boolean,
        default: false
    },
    extra: {
       type: [String]
    }
});

module.exports = Task = mongoose.model('tasks',taskSchema);