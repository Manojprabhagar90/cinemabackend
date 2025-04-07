const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('City',citySchema,'Cities')