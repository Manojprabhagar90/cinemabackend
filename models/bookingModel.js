const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema({
    showID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'show',
        required: true
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
    status:String,
    bookedSeats : [Object],
    orderId : String
})

module.exports = mongoose.model('booking',bookingSchema,'bookings');