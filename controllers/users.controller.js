const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

// const getUsers = async (req,res) => {

//     const users = await User.findAll({limit:1});
//     res.json({users});
    
// }

const getUser = async (req,res) => {

    const { id } = req.params;
    const user = await User.findByPk( id );
    res.json({user});

}


const putUser = async (req,res) => {

    const { id } = req.params;
    const { password, total_updates, last_login, ...rest } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        pass = bcryptjs.hashSync( password, salt );
    }

    const user =  await User.update({ departamento: rest.departamento, municipio: rest.municipio},{where: {id: id}});
    
    res.json({
        msg:"Usuario actualizado correctamente",
        user
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
    // getUsers,
    getUser,
    putUser,
    postUser
}