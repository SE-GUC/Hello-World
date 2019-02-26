const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    }}
)

module.exports = Admin = mongoose.model('admin', UserSchema)