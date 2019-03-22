
mongoose = require('mongoose');
Schema = mongoose.Schema;

const partnerSchema = new Schema({
    organization: {
      type: Schema.Types.ObjectId,
        ref: 'organizations'
    },
    partners: {
        type: [Schema.Types.ObjectId],
        ref: 'partners'
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
    fieldOfWork: {
        type: String,
        required: true
    },
    pastProjects: {
        type: [Schema.Types.ObjectId],
        ref: 'tasks'
    },
    feedback: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'members'
            },
            review: {
                type: String,
                required: true
            }
        }
    ],


});


module.exports = Partner = mongoose.model('partners',partnerSchema);
