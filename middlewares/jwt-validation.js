const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const validateJWT = async ( req , res , next) => {


    const token = req.header('Authorization');

    if( !token ) {
        return res.status(401).json({
            msg: 'Token faltante'
        })
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRET_KEY );

        const user = await User.findOne( { attributes : {exclude: ['password']}, where:{id:uid}});

        if (!user){
            return res.status(401).json({
                msg: "Token no valido - El usuario no existe en base de daots"
            });
        }

        req.uid = user;
        
        next();

    } catch (err) {

        console.log( err );

        res.status(401).json({
            msg: "Token no valido"
        });

    }
}

module.exports = {
    validateJWT
}