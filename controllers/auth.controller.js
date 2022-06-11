
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req,res) => {

    const { username, password } = req.body;
    
    try {
        
        const user = await User.findOne( { 
            where: {username: username},
            attributes: { exclude: ['total_updates','createdAt','updatedAt'] }
        });

        // VERIFICO USUARIO
        if( !user ){
            return res.status(400).json({
                msg: "Usuario o contraseña incorrecta"
            });
        }
        

        // VERIFICO CONTRASEÑA
        const comparePassword = bcryptjs.compareSync( password, user.password);

        if ( !comparePassword ) {
            return res.status(400).json({
                msg:"Usuario o contraseña incorrecta"
            });
        }

        delete user.dataValues.password;

        // GENERO JWT
        const token = await generateJWT( user.id );

        res.json({
            msg: "Login Ok",
            user,
            token
        })

        
    } catch (err) {
        
        console.log('Error en autenticación: ', err);

        return res.status(500).json({
            msg: "Error al autenticarse, intentelo nuevamente o consulte con el administrador."
        })

    }
}


module.exports = {
    login
}