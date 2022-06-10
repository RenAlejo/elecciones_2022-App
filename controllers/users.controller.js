const bcryptjs = require('bcryptjs');
const validator =  require('express-validator');

const User = require('../models/user.model');

const getUsers = async (req,res) => {

    const users = await User.findAll();
    res.json({users});
}


const getUser = async (req,res) => {

    const { id } = req.params;
    const user = await User.findByPk( id );

    if(!user){
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
    }

    res.json({user});
}


const putUser = (req,res) => {

    const { id } = req.params;

    res.json({
        msg:"put API",
        id
    });
}


const postUser = async (req,res) => {

    const {username, password  } = req.body;
    const user = new User({username,password});
    
    // ENCRIPTAR CONTRASENA
    const salt =  bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
     
    // GUARDAR USUARIO 
    await user.save();

    res.json({
        msg:"Usuario creado con exito",
        user
    });

}

module.exports = {
    getUsers,
    getUser,
    putUser,
    postUser
}