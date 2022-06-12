
const Tipologia = require('../models/tipologia.model');

const getTipologia = async ( req, res) => {

    const tipologias = await Tipologia.findAll();
    res.json({tipologias});
    
}


module.exports = {
    getTipologia
}