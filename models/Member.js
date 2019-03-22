
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
        max:40
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    interests: {
        type: [String],
    },
    pastEvents: [
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
    tasksCompleted: [
        {
            task:{
                type: Schema.Types.ObjectId,
                ref: 'tasks'
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    reviews: [
        {
            partner: {
                type: Schema.Types.ObjectId,
                ref: 'partners'
            },
            rating: {
                type: Number,
                required: true
            },
            review: {
                type: String,
                required: true
            }
        }
    ],
    certificates: [
        {
            title: {
                type: String,
                required: true
            },
            entity: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    masterclasses: [
        {
            masterclass: {
                type: Schema.Types.ObjectId,
                ref: 'masterclasses'
            },
            date:{
                type: Date,
                required: true
            }
        }
    ],
    recommendedMasterclasses: {
        type: [Schema.Types.ObjectId],
        ref: 'masterclasses'
    },
    notifications: [
        {
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'members'
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
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }

});



module.exports = Member = mongoose.model('members',memberSchema);