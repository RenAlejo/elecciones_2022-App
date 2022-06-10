

const Voto = require('../models/voto.model');

const votosPut = (req,res) => {
    res.json({
        msg:"put API"
    });
}


const votosPost = async (req,res) => {

    const {...rest} = req.body;
    const voto = new Voto({...rest});

    // GUARDAR USUARIO 
    await voto.save();

    res.json({
        msg:"Formulario registrado correctamente",
    });

}

module.exports = {
    votosPut,
    votosPost
}