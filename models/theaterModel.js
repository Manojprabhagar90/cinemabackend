const mongoose = require('mongoose');
mongoose.set('debug', true)
const theaterSchema = new mongoose.Schema({
    theater_name:String,
    city:String,
    email : String,
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Theater',theaterSchema,'Theaters')