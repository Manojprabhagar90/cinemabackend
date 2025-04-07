const express = require('express');
const cityController = require('../controllers/cityControllers');


const cityRouter = express.Router();

cityRouter.get('/getallcity',cityController.getAll);

module.exports = cityRouter