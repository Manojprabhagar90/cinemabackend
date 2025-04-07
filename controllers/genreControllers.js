const Genre = require('../models/genreModel')

const genreController = {
    getAll : async(request,response) =>{
        const genres = await Genre.find({}).select('name').lean();
        const genreArray = genres.map(item => item.name);
        response.status(200).json(genreArray);
    }
        
}

module.exports = genreController;