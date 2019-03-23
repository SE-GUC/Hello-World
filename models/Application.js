/*class Application {
    constructor(description, partner, id, needConsultancy) {
        this.description = description;
        this.partner = partner;
        this.applicants = [];
        this.id =id;
        this.messages = [];
        this.consultant = null;
        this.needConsultancy = needConsultancy;
        this.reviewed = false;
    };
    
}

module.exports = Application;*/

mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const applicationSchema = new Schema({
    partner:{
      type: Schema.Types.ObjectId,
      ref: 'partners'
    },
    description:{
        type: String,
        required: 'true'
    },
    applicants: [
        {
            consultant: {
                type: Schema.Types.ObjectId,
                ref: 'consultants'
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
    messages: [
        {
            status:{
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    needConsultancy: {
        type: Boolean,
        required:true
    },
    reviewed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Application = mongoose.model('applications',applicationSchema);
