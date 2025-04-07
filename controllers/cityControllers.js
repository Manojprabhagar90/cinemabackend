const City = require('../models/cityModel')

const cityController = {
    getAll : async(request,response) =>{
        const Cities = await City.find({}).select('name').lean();
        const cityArray = Cities.map(item => item.name);
        response.status(200).json(cityArray);
    }
        
}

module.exports = cityController;