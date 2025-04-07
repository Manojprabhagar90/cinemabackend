const mongoose = require('mongoose');


const showSchema = mongoose.Schema({
    screen_id: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'screenModel',  
            required: true
          },
          movie_id: {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'movieModel',  
            required: true
          },
          showdatetime : Date
});

module.exports = mongoose.model('show',showSchema,'shows')