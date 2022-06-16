

const isAdminRole = ( req, res, next ) => {

    if( !req.uid ) {
        return res.status(500).json({
            msg: 'El rol no puede ser validado sin tener un token primero'
        })
    }

    const { rol } = req.uid.dataValues;

    if ( rol !== 'administrator') {
        console.log('Entro 1');
        return res.status(400).json({
            msg: "Permisos insuficientes"
        });
    }

    next();

}

const isUserRole = ( req, res, next) => {

    if( !req.uid ) {
        return res.status(500).json({
            msg: 'El rol no puede ser validado sin token'
        })
    }
    
    const { rol } = req.uid.dataValues;
    
    if ( rol !== 'user' && rol !== 'administrator') {
        
        return res.status(400).json({
            msg: "Permisos insuficientes"
        });
    }

    next();

}

module.exports = {
    isAdminRole,
    isUserRole
}