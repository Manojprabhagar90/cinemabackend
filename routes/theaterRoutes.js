const express = require("express");
const multer = require('multer')
const theaterControllers = require("../controllers/theaterControllers");

const theaterRouter = express.Router();
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

theaterRouter.post('/add',upload.single('file'),theaterControllers.addTheater);
theaterRouter.get('/:reqmovieId/:reqdate',theaterControllers.getTheaterbymovieid)
module.exports = theaterRouter;