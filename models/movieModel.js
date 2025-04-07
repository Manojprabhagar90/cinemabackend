const mongoose = require("mongoose");
mongoose.set('debug', true)

const movieSchema = new mongoose.Schema({
    title: String,
    genres : [String],
    languages : [String],
    runtime : String,
    posterimg : String,
    releasedate : Date,
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Movie",movieSchema,"movies")