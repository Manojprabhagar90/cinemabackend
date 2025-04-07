const express = require('express');
const  showControllers  = require('../controllers/showControllers');
const multer = require('multer')

const showRouter = express.Router();
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

showRouter.post('/add',upload.single('file'),showControllers.addShow);

module.exports = showRouter;