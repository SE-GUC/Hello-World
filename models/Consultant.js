<<<<<<< HEAD
<<<<<<< HEAD
class Consultant {
    constructor(id) {
        this.id = id;
        this.boardMembers = [];
        this.events = [];
        this.partners = [];
        this.reports = [];
        this.applications = [];
    };
};
=======
=======
>>>>>>> 12676bf3a6caf9cc308bb89fe2c0c17ce1de4463
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
<<<<<<< HEAD
		 
<<<<<<< HEAD
>>>>>>> profile


=======
>>>>>>> 12676bf3a6caf9cc308bb89fe2c0c17ce1de4463
=======
>>>>>>> 175a993e09fa3286f6ef0f150e7b2c134c04cb8f




module.exports = Consultant= mongoose.model('Consultant', ConsultantSchema)
