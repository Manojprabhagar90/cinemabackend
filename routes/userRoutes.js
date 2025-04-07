const express = require('express');
const userControllers = require('../controllers/userControllers');
const multer = require("multer")
const userRouter = express.Router();

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

userRouter.post('/add',upload.single('file'),userControllers.addUser);
userRouter.post('/login',upload.single('file'),userControllers.login);

module.exports = userRouter;