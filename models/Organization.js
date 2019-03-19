/*class Organization {
    constructor(name,age,id) {
    this.name = name;
    this.age = age;
    this.id = id;
    };
}*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
   age: {
        type: int,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = Organization = mongoose.model('organizations', OrganizationSchema)