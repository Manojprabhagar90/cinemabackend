const express = require("express");
const languageController = require("../controllers/languageControllers");

const languageRouter = express.Router();

languageRouter.get('/getalllanguage',languageController.getAll)

module.exports = languageRouter;