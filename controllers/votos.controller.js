

const Voto = require('../models/voto.model');


const votosPost = async (req,res) => {

    const {...rest} = req.body;
    const { departamento, municipio, ...userinfo }  =  req.uid.dataValues;
    const voto = new Voto({...rest});

    if (userinfo.rol != 'user' && userinfo.rol != 'administrator') {
        return res.status(400).json({
            msg: "Permisos insuficientes"
        });
    }

    // GUARDAR USUARIO 
    await voto.save();

    res.json({
        msg:"Formulario registrado correctamente",
        userinfo
    });

}

module.exports = {
    votosPost
}