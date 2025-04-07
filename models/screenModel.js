const mongoose = require("mongoose");

const screenSchema = mongoose.Schema({
    screen_name : String,
    showtimes : [],
    seatMapData: [],
    theater_id: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'theaterModel',  
        required: true
      },
      createdAt:{
          type:Date,
          default:Date.now
      },
      updatedAt:{
          type:Date,
          default:Date.now
      }
});

module.exports = mongoose.model("Screen",screenSchema,"Screens")