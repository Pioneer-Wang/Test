const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const NewsSchema=new Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cate:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})

// module.exports=News=mongoose.model('news',NewsSchema)
const News=mongoose.model('news',NewsSchema)
module.exports=News

