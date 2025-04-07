const Screen = require("../models/screenModel")
const mongoose = require("mongoose");
const screenControllers = {
    getAll : async(request,response) =>{
        const { id } = request.params;
                const movies = await Screen.find({ theater_id:new mongoose.Types.ObjectId(id) },{_id:1,screen_name:1,showtimes:1});
                response.status(200).json(movies);
            },
    getScreenbyId : async(request,response)=>{
        try {
            const { id } = request.params;
           
            const screen = await Screen.findById(id);
            if(!screen){
                response.status(404).json({message:'Screen Not found'})
            }


            response.status(200).json(screen);
        } catch (error) {
            
        }
    },
    addScreen : async(request,response)=>{
        try {
            
            
            const { theaterid,screenname,screenid } = request.body;
            const showtimings = JSON.parse(request.body.showtimings);
            let tempshowtimes = showtimings.map(({value,label})=>value);
            if(screenid){
                const dbscreen = await Screen.findById(screenid);
                dbscreen.screen_name = screenname;
                dbscreen.showtimes = tempshowtimes;
                await dbscreen.save();
                response.status(200).json(dbscreen);
            }else{
                const newScreen = new Screen({
                    theater_id : theaterid,
                    showtimes : tempshowtimes,
                    screen_name : screenname
                });

                await newScreen.save();

                response.status(201).json(newScreen);
            }
        } catch (error) {
            response.status(500).json(error)
        }
    },
    updateScreenseatings : async(request,response)=>{
        try {
           

            const { seats,screenid } = request.body;
            const dbscreen = await Screen.findById(screenid);
            
            
            dbscreen.seatMapData = JSON.parse(seats).seatMapData;
            await dbscreen.save();
            response.status(200).json(dbscreen);
        } catch (error) {
            response.status(500).json(error)
        }
    }
}

module.exports = screenControllers;