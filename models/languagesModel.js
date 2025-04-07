const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
    name : String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Language",languageSchema,"Languages")