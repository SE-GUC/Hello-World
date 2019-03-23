const Joi = require('joi')
module.exports = {
	editValidation: request => {
	   const editSchema ={
	     id: Joi.number().required() ,
		 courses: Joi.string() , 
		 status: Joi.string() , 
		 trainers: Joi.string() , 
		 certificates: Joi.string() , 
		 trainigPrograms: Joi.string() , 
		 
		 }
		 return Joi.validate(request, editSchema)
	},
	
     addcoursesValidation: request => {
	   const addcoursessSchema ={
	     
		courses: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addcoursessSchema)},
	 
	 addtrainersValidation: request => {
	   const addtrainersSchema ={
	     
		 partners: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addtrainersSchema)},
	 
	  addcertificatesValidation: request => {
	   const addcertificatesSchema ={
	     
		 reports: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addcertificatesSchema)},
	 
	 addtrainigProgramsValidation: request => {
	   const addtrainigProgramsSchema ={
	     
		 events: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addtrainigProgramsSchema)},
	 }