
const { validationResult } = require('express-validator');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const isFieldEmpty = ( req, res, next ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();

}


module.exports = {
    isFieldEmpty
};