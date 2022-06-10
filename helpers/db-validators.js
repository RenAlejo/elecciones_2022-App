const Municipio = require('../models/municipio.model');

const isMunInDep = async(req, res) =>{

    const {codigo_mun,codigo_dep} = res.req.body;
    const munInDep = await Municipio.findOne({ where: { codigo_mun: codigo_mun, codigo_dep: codigo_dep}});

    if( !munInDep ) {
            throw new Error("El municipio no pertenece al departamento seleccionado");
    }
}

module.exports = {
    isMunInDep
}