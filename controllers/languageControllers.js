const Language = require('../models/languagesModel')

const languageController = {
    getAll : async(request,response) =>{
        const Languages = await Language.find({}).select('name').lean();
        const languageArray = Languages.map(item => item.name);
        response.status(200).json(languageArray);
    }
        
}

module.exports = languageController;