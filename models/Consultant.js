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
		 

module.exports = Consultant= mongoose.model('Consultant', ConsultantSchema)