const express = require("express");
const movieControllers = require("../controllers/movieControllers");
const multer = require("multer")
const movieRouter = express.Router();
const path = require('path')

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

movieRouter.get('/getallmovie',movieControllers.getAllMovie);
movieRouter.get('/getallmovie/:city/:reqdate',movieControllers.getAll);
movieRouter.post('/add',upload.single('file'),movieControllers.addMovie);

module.exports = movieRouter;
