const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const ReportSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    reason:{
        type:String,
        required:true
    },
})
const Report=mongoose.model('reports',ReportSchema)
module.exports=Report
