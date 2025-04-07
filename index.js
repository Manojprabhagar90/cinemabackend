const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('DB connected successfully...');
    app.listen(3001,()=>{
        console.log("Waiting for your request...");
        
    })
}).catch(()=>{
    console.log("DB not connected...");
    
})