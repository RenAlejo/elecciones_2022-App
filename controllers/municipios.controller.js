const Municipio = require('../models/municipio.model');

const municipiosGet = async (req,res) => {

    const municipios = await Municipio.findAll();
    res.json({municipios});
    
}

module.exports = {
    municipiosGet
}