const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const SumSchema=new Schema({
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
const Sum=mongoose.model('sums',SumSchema)
module.exports=Sum
