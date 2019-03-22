const mongoose = require('mongoose');
const Schema = mongoose.Schema
const AdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        max:40
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    date: {
        type: String,
        default: Date.now()
    }
})
module.exports = Admin = mongoose.model('admins',AdminSchema)