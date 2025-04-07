const showModal = require("../models/showModel");

function convertTo24HourWithIntl(time12hr) {
    const date = new Date("1970-01-01 " + time12hr);  
    const formatter = new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false  
    });
    return formatter.format(date); 
  }

const showControllers = {
    addShow : async(request,response)=>{
                try {
                    const movie_id = request.body.movieid;
                    const screen_id = request.body.screenid;
                    const showtime = JSON.parse(request.body.showtime)
                  
                   let timeformat = convertTo24HourWithIntl(showtime.value.replace(/(am|pm)/, (match) => match.toUpperCase()));
                   
                   const [hours, minutes] = timeformat.split(":");

                   const showdate = new Date(request.body.showdate);
                   showdate.setHours(showdate.getHours()+5);
                   showdate.setMinutes(showdate.getMinutes()+30);
                   showdate.setHours(showdate.getHours()+parseInt(hours));
                   showdate.setMinutes(showdate.getMinutes()+parseInt(minutes));
                  
                    const newShow = new showModal({
                        movie_id,
                        screen_id,
                        showdatetime:showdate
                    });
        
                    await newShow.save().then(() => console.log('Show saved!'))
                    .catch((err) => console.error('Error saving show:', err));
        
                    response.status(201).json(newShow);
                } catch (error) {
                    response.status(500).json(error)
                }
            }
}

module.exports = showControllers;