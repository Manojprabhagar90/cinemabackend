const express = require("express");
const genreController = require("../controllers/genreControllers");

const genreRouter = express.Router();
genreRouter.get('/getallgenres',genreController.getAll)

module.exports = genreRouter;