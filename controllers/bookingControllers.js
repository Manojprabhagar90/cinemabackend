const email_templates = require('../email_templates/email_template');
const booking = require('../models/bookingModel');
const mongoose = require('mongoose');
const common_utils = require('../utils/common_utils');

const bookingController = {
    getAllBookedSeats : async(request,response)=>{
        const {reqshowId} = request.params;
        const objectId = new mongoose.Types.ObjectId(reqshowId);
        const bookedSeats = await booking.aggregate([
            { 
              $match: { 
                     showID: objectId,
                     status : 'booked'  
              }
            },
          
           { $unwind: "$bookedSeats" },
          
            { 
              $project: {
                _id: 0, 
                row: "$bookedSeats.row",
                label: "$bookedSeats.label"
              }
            },
          
           { 
              $group: {
                _id: { row: "$row", label: "$label" } 
              }
            },
          
             {
              $project: {
                row: "$_id.row",
                label: "$_id.label"
              }
            }
          ])
         response.status(200).json(bookedSeats);
    },
    addBookings : async(request,response)=>{
        
        
        try {
                   
                    const { selected,showID,orderId,theater,screen,show,user,movie } = request.body;
                    const inputtheater = JSON.parse(theater);
                    const inputscreen = JSON.parse(screen);
                    const inputshow = JSON.parse(show);
                    const inputuser = JSON.parse(user);
                    const inputmovie = JSON.parse(movie);
                    const user_id = new mongoose.Types.ObjectId(inputuser._id);
                    const selectedseats = JSON.parse(selected);
                    const ticketseat = selectedseats.map((seat)=>{
                     return seat.row+seat.label
                    }).join(",");
                    
                    
                    const inputDate = new Date(inputshow.showdatetime)
                    const tickettime = new Date(inputDate.toISOString()).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                      timeZone: 'UTC'  
                      })
                      const year = inputDate.getFullYear();
                      
                      const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                      const day = String(inputDate.getUTCDate()).padStart(2, '0'); 

                      const ticketdate = `${day}/${month}/${year}`;
                      
                    
                    const newBooking = new booking({
                      showID ,
                      bookedSeats : JSON.parse(selected),
                      status:'booked',
                      orderId,
                      user_id
                    });
        
                    await newBooking.save().then((newBooking) => {
                      const email_template = email_templates.booked_ticket(inputtheater.name,inputscreen.screen_name,ticketseat,ticketdate,tickettime,inputmovie.title);
                      const email_body = email_template.body;
                      const email_subject = email_template.subject;
                      const email_to = inputuser.email;
                      common_utils.email_send(email_to,email_subject,email_body);
                    })
                    .catch((err) => {
                      console.error('Error saving user:', err);
                    });
        
                    response.status(201).json(newBooking);
                } catch (error) {
                    response.status(500).json(error)
                }
    },
    getAllBookedTicketsbyUser : async(request,response)=>{
      const {requserId} = request.params;
      const objectId = new mongoose.Types.ObjectId(requserId);
      const bookedtickets = await booking.aggregate([
        {
            $lookup : {
                from : 'shows',
                localField : 'showID',
                foreignField : '_id',
                as : 'shows'
            }
        },{
            $unwind : '$shows'
        },{
            $lookup : {
                from : "movies",
                localField : "shows.movie_id",
                foreignField : '_id',
                as : 'movies'
            }
        },{
            $unwind : '$movies'
        },
        {
            $lookup : {
                from : 'Screens',
                localField : 'shows.screen_id',
                foreignField : '_id',
                as : 'screens'
            }
        },
        {
            $unwind : '$screens'
        },
        {
            $lookup : {
                from : 'Theaters',
                localField : 'screens.theater_id',
                foreignField : '_id',
                as : 'theaters'
            }
        },
        {
            $unwind : '$theaters'
        },
        {
            $match : {
                user_id : objectId 
            }
        },
        {
            $group :{
                _id: "$_id",
                theater_name : { $first : "$theaters.theater_name"} ,
                screen_name : { $first : "$screens.screen_name"}   ,
                bookedSeats : { $first : "$bookedSeats"} ,
                showdatetime : { $first : "$shows.showdatetime"} ,
                moviename : { $first : "$movies.title"}
            }
        }
    ])
       response.status(200).json(bookedtickets);
  },
      updateBookings : async(request,response)=>{
          try {
             
  
            const {booking_id} = request.params;
            
              const dbbooking = await booking.findById(booking_id);
              
              
              dbbooking.status = 'cancelled';
              await dbbooking.save();
              response.status(200).json(dbbooking);
          } catch (error) {
              response.status(500).json(error)
          }
      }
}

module.exports = bookingController;