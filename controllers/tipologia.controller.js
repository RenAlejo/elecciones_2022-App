
const Tipologia = require('../models/tipologia.model');

const getTipologia = async ( req, res) => {

    const municipios = await Tipologia.findAll();
    res.json({municipios});
    
}


module.exports = {
    getTipologia
}