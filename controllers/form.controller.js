

const Form = require('../models/form.model');


const formPost = async (req,res) => {

    const {...rest} = req.body;
    const { departamento, municipio, ...userinfo }  =  req.uid.dataValues;
    const form = new Form({...rest});

    // GUARDAR FORMULARIO 
    await form.save();

    res.json({
        msg:"Formulario registrado correctamente",
        userinfo
    });

}

module.exports = {
    formPost
}