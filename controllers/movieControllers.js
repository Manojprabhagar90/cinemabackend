const Movie = require("../models/movieModel")
const mongoose = require('mongoose');

const movieControllers = {
    getAll : async(request,response) =>{
        const {city,reqdate} = request.params;
                let checkdate = new Date(reqdate)
                checkdate.setHours(checkdate.getHours()+5);
                checkdate.setMinutes(checkdate.getMinutes()+30);
            const movies = await Movie.aggregate([

                {
                                 
                                 $lookup: {
                                   from: "shows",                
                                   localField: "_id",     
                                   foreignField: "movie_id", 
                                   pipeline: [
                                     {
                                       $match: {
                                         "showdatetime": {
                                           $gte: new Date(checkdate) 
                                              
                                         }
                                         
                                       }
                                     }
                                   ],   
                                   as: "shows"                   
                                 }
                               },
                               {
                                 $unwind: "$shows"
                               },
                               {
                                 
                                 $lookup: {
                                   from: "Screens",              
                                   localField: "shows.screen_id",              
                                   foreignField: "_id",    
                                   as: "screens"                 
                                 }
                               },
                               {
                                 $unwind: "$screens"
                               },
                               {
                                 
                                 $lookup: {
                                   from: "Theaters",              
                                   localField: "screens.theater_id",              
                                   foreignField: "_id",    
                                   as: "theaters"                 
                                 }
                               },
                               {
                                 $unwind: "$theaters"
                               },
                              
                               {
                                 
                                 $match: {
                                   "theaters.city": city
                                   
                                 }
                               },
                               {
                                 // Step 6: Group by theater_id to get the theaters with all screens and showtimes for the movie
                                 $group: {
                                   _id: "$_id",                     // Group by theater ID
                                   title: { $first: "$title" },  
                                   runtime: { $first: "$runtime" }, 
                                   releasedate: { $first: "$releasedate" }, 
                                   posterimg: { $first: "$posterimg" }, 
                                   languages: { $first: "$languages" }, 
                                   genres: { $first: "$genres" }
                                   
                                 }
                               }
                             ]);
            response.status(200).json(movies);
        },
        addMovie : async(request,response)=>{
            try {
                
                const posterimg = request.file.filename;
                
                const { moviename,runtime } = request.body;
                const releasedate = new Date(request.body.releasedate);
                releasedate.setHours(releasedate.getHours()+5);
                releasedate.setMinutes(releasedate.getMinutes()+30);
                const genres = JSON.parse(request.body.genres);
                let tempgenres = genres.map(({value,label})=>value);
                
                const languages = JSON.parse(request.body.languages);
                
                let templanguages = languages.map(({value,label})=>value);
                
                const newMovie = new Movie({
                    title : moviename,
                    runtime,
                    genres : tempgenres,
                    languages : templanguages,
                    posterimg,
                    releasedate
                });
    
                await newMovie.save().then(() => console.log('User saved!'))
                .catch((err) => console.error('Error saving user:', err));
    
                response.status(201).json(newMovie);
            } catch (error) {
                response.status(500).json(error)
            }
        }
}

module.exports = movieControllers;