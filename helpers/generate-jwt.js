const jwt = require('jsonwebtoken');
const { USE } = require('sequelize/types/index-hints');
const User = require('../models/user.model');

const generateJWT = ( uid  = '' ) => {

    return new Promise((resolve,reject) => {

        const payload = { uid };

        jwt.sign( payload , process.env.SECRET_KEY, {
            expiresIn: '3h'
        }, ( err, token  ) => {
            if(err) {
                console.log(err)
                reject( ' Error al generar el token ')
            } else {
                resolve( token );
            }
        });
    });

}


const verifyToken = async ( token = ' ') => {
    
    try {

        if ( token.length < 10 ) {
            return null;
        }

        const { uid } =  jwt.verify( token,  process.env.SECRET_KEY);
        const user = await User.findByPk(uid);

        if( user ) {
            return user;
        } else{
            return null;
        }

    } catch( err ) {
        return null;
    }

}

module.exports = {
    generateJWT,
    verifyToken
}