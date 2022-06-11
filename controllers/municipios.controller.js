const Municipio = require('../models/municipio.model');

const municipiosGet = async (req,res) => {

    const { codep } = req.params;

    const municipios = await Municipio.findAll({ where: {codigo_dep : codep}});
    res.json({municipios});
    
}

module.exports = {
    municipiosGet
}