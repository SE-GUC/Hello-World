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
     id: {
		 type: Number,
	     required: true},
	 workPosition: { 
	     type: String,
	     required: true},
     status: {
		 type: String,
		 required: true},
	 boardMembers: {
		 type: [String],
		 required: true},
	 events: {
		 type: [String],
		 required: true},
	partners: {
		 type: [String],
		 required: true},
     reports: {
		 type: [String],
		 required: true},
	applications: {
		 type: [String],
		 required: true}
})
		 
<<<<<<< HEAD
>>>>>>> profile


=======
>>>>>>> 12676bf3a6caf9cc308bb89fe2c0c17ce1de4463

module.exports = Consultant= mongoose.model('Consultant', ConsultantSchema)