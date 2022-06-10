

const Municipio = require('../models/municipio.model');
const User = require('../models/user.model');

const isMunInDep = async(req, res) =>{

    const {codigo_mun,codigo_dep} = res.req.body;
    const munInDep = await Municipio.findOne({ where: { codigo_mun: codigo_mun, codigo_dep: codigo_dep}});

    if( !munInDep ) {
            throw new Error("El municipio no pertenece al departamento seleccionado");
    }
}



const userExist = async( username ) => {

    // VALIDAR SI EL REGISTRO EXISTE
    const user = await User.findOne({where: {username: username}}); 
    
    if( user ) {
        throw new Error(`El nombre de usuario ${username} ya está registrado`);
    }

}

module.exports = {
    isMunInDep,
    userExist
}