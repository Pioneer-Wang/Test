const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const TieZiSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    t_number:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})
const TeiZi=mongoose.model("teizi",TieZiSchema)
module.exports=TeiZi
