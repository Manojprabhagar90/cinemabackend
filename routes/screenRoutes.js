const express = require("express");
const screenControllers = require("../controllers/screenController");
const multer = require('multer');
const path = require('path');

const screenRouter = express.Router();
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

screenRouter.post('/add',upload.single('file'),screenControllers.addScreen);

screenRouter.get("/:id",screenControllers.getScreenbyId);
screenRouter.get("/option/:id",screenControllers.getAll);

screenRouter.put("/seatdata",screenControllers.updateScreenseatings);

module.exports = screenRouter;