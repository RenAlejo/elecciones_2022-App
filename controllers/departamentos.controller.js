
const Departamento = require('../models/departamento.model');
const User =  require('../models/user.model');

const departamentosGet = async (req,res) => {

    const departamentos =  await Departamento.findAll();
    const { id } =  req.uid.dataValues;
    const user = await User.findOne({
        where: {id: id}, 
        attributes: { exclude:['password','total_updates','updatedAt']}
    });

    if(!user) {
        return res.status(401).json({
            msg: "Ocurrió un error, inténtelo nuevamente o consulte con el administrador."
        });
    }

    res.json({
        user,
        departamentos
    });
    
}

module.exports = {
    departamentosGet 
}