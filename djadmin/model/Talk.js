const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TalkSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Talk=mongoose.model('talks',TalkSchema)
module.exports=Talk

