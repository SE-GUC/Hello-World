/*class Admin{
    constructor(name,id){
        this.name = name;
        this.id = id;
    }
}
module.exports = Admin;*/
const mongoose = require('mongoose')
const schema = mongoose.Schema
const AdminSchema = new schema({
    name:{
        type:string,
        required:true
    },
    User:{
        type:Schema.Type.ObjectId,
        ref:'users'
    }
})