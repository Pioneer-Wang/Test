const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    Uid:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    sort:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('users',UserSchema)
module.exports=User
// module.exports =User = mongoose.model("users",UserSchema)