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
const mongoose = require('mongoose')
const schema = mongoose.Schema
const ApplicationSchema = new schema({
    description:{
        type:String,
        required:true
    },
    partner:{
        type:String,
        required:true
    },
    applicants:{
        type:[String],
        required:true
    },
    messages:{
        type:[String]
    },
    consultant:{
        type:String
    },
    needConsultancy:{
        type:Boolean,
        required:true
    },
    reviewed:{
        type:Boolean,
        required:true
    },
    User:{
        type:Schema.Type.ObjectId,
        ref:'users'
    }
})
module.exports = Application = mongoose.module('applications',ApplicationSchema)