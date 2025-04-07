const express = require('express');
const userControllers = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/add',userControllers.addUser);
userRouter.post('/login',userControllers.login);

module.exports = userRouter;