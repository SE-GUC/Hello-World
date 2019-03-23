// class Education {
//     constructor(id) {
//         this.id = id;
//         this.courses = [];
//         this.trainers = [];
//         this.certificates = [];
//         this.trainigPrograms = [];
//     };
// }
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constructorSchema = new Schema({
     
	 workPosition: { 
	     type: String,
	     required: true},
     status: {
		 type: String,
		 required: true},
         courses: {
		 type: [String],
		 required: false},
         trainers: {
		 type: [String],
		 required: false},
         certificates: {
		 type: [String],
		 required: false},
         trainigPrograms: {
		 type: [String],
		 required: false},
	
})
		 



module.exports = Consultant= mongoose.model('Education', ConsultantSchema)
//module.exports = Education;