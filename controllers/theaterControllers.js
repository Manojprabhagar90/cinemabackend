const Theater = require("../models/theaterModel")
const user = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const common_utils = require('../utils/common_utils');
const email_templates = require('../email_templates/email_template');
const mongoose = require('mongoose');
const theaterControllers = {
    
        addTheater : async(request,response)=>{
            try {
                const theatername = request.body.theatername;
                const theaterownername = request.body.theaterownername;
                const email = request.body.email;
                const random_string = common_utils.generate_random_string(4);
                const password = theatername+"_"+random_string;
                const encrypted_password = await bcrypt.hash(password,10);
                const city = JSON.parse(request.body.city);
                let tempcity = city.value;
                const role = 'theater_admin'
                const userExists = await user.findOne({ email : email});
                 
                if (userExists) {
                    return response.status(400).json({ message: 'Email already exists' });
                }
                const newUser = new user({
                    name:theaterownername,email,password:encrypted_password,role
                });
                const email_template = email_templates.theater_template(theaterownername,password);
                const email_body = email_template.body;
                const email_subject = email_template.subject;
                const email_to = email;
                common_utils.email_send(email_to,email_subject,email_body);
    
                await newUser.save();
                const newTheater = new Theater({
                    theater_name:theatername,
                    city:tempcity,
                    userid : newUser._id
                });
    
                await newTheater.save().then(() => console.log('Theater saved!'))
                .catch((err) => console.error('Error saving theater:', err));
    
                response.status(201).json(newTheater);
            } catch (error) {
                response.status(500).json(error)
            }
        },
        getTheaterbymovieid : async(request,response)=>{
            try {
                const {reqmovieId,reqdate} = request.params;
                
                let checkdate = new Date(reqdate)
                checkdate.setHours(checkdate.getHours()+5);
                checkdate.setMinutes(checkdate.getMinutes()+30);
                
                const tempenddate = new Date(checkdate);
                tempenddate.setUTCHours(23, 59, 59, 999);

                const enddate = tempenddate.toISOString();
                
                
                

                const objectId = new mongoose.Types.ObjectId(reqmovieId);
                const theaters = await Theater.aggregate([
                    {
                      
                      $lookup: {
                        from: "Screens",              
                        localField: "_id",              
                        foreignField: "theater_id",    
                        as: "screens"                 
                      }
                    },
                    {
                      $unwind: "$screens"
                    },
                    {
                      
                      $lookup: {
                        from: "shows",                
                        localField: "screens._id",     
                        foreignField: "screen_id", 
                        pipeline: [
                          {
                            $match: {
                              "showdatetime": {
                                $gte: new Date(checkdate) ,
                                $lte : new Date(tempenddate)    
                              }
                              
                            }
                          }
                        ],   
                        as: "shows"                   
                      }
                    },
                    {
                      
                      $match: {
                        "shows.movie_id": objectId
                        
                      }
                    },
                    {
                      
                      $project: {
                        _id: 1,                         // Theater ID
                        theater_name: 1,                         // Theater name
                        city: 1,                     // Theater location
                        screen_id: "$screens._id",       // Screen ID
                        screen_name: "$screens.screen_name",    // Screen name
                        showtimes: {                    
                            $map: {
                              input: "$shows",             
                              as: "show",                 
                              in: {                        
                                showId: "$$show._id",      
                                showdatetime: "$$show.showdatetime" 
                              }
                            }
                          }  // Showtimes (showdatetime)
                      }
                    },
                    {
                      // Step 6: Group by theater_id to get the theaters with all screens and showtimes for the movie
                      $group: {
                        _id: "$_id",                     // Group by theater ID
                        name: { $first: "$theater_name" },  
                        city: { $first: "$city" },      // Include the theater name
                        screens: {                        // Push the screens and showtimes into an array
                          $push: {
                            screen_id: "$screen_id",
                            screen_name: "$screen_name",
                            showtimes: "$showtimes"
                          }
                        }
                      }
                    }
                  ])
                  
                  response.status(200).json(theaters);
            } catch (error) {
                response.status(500).json(error)
            }
        }
}

module.exports = theaterControllers;