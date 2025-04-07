const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    role : String,
    createdAt:{
          type:Date,
          default:Date.now
      },
      updatedAt:{
          type:Date,
          default:Date.now
      }
});

module.exports = mongoose.model("user",userSchema,"users")