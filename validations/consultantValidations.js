const Joi = require('joi')
module.exports = {
	editValidation: request => {
	   const editSchema ={
	     id: Joi.number().required() ,
		 workPosition: Joi.string() , 
		 status: Joi.string() , 
		 boardMembers: Joi.string() , 
		 events: Joi.string() , 
		 partners: Joi.string() , 
		 reports: Joi.string() , 
		 applications: Joi.string() 
		 }
		 return Joi.validate(request, editSchema)
	},
	
     addboardmembersValidation: request => {
	   const addboardmembersSchema ={
	     
		 boardMembers: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addboardmembersSchema)},
	 
	 addpartnersValidation: request => {
	   const addpartnersSchema ={
	     
		 partners: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addpartnersSchema)},
	 
	  addreportsValidation: request => {
	   const addreportsSchema ={
	     
		 reports: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addreportsSchema)},
	 
	 addeventsValidation: request => {
	   const addeventsSchema ={
	     
		 events: Joi.string() , 
		 
		 }
	 return Joi.validate(request, addeventsSchema)},
	 }