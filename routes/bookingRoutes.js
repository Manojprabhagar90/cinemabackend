const bookingController= require('../controllers/bookingControllers');
const multer = require("multer")
const express = require('express');

bookingRouter = express.Router();

            const storage = multer.diskStorage({
                destination:(req,file,cb)=>{
                    cb(null,'Uploads')
                },
                filename:(req,file,cb)=>{
                    cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
                }
            })
            
            const upload = multer({
                storage : storage
            })

bookingRouter.get('/:reqshowId',bookingController.getAllBookedSeats);
bookingRouter.post('/add',upload.single('file'),bookingController.addBookings);
bookingRouter.get('/tickets/:requserId',bookingController.getAllBookedTicketsbyUser);
bookingRouter.put('/:booking_id',upload.single('file'),bookingController.updateBookings);
module.exports = bookingRouter;
