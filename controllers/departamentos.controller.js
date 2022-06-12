
const Departamento = require('../models/departamento.model');


const departamentosGet = async (req,res) => {

    const departamentos =  await Departamento.findAll();
    res.json({departamentos});
    
}

module.exports = {
    departamentosGet 
}