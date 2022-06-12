const { Router } = require('express');
const router = Router();

const { getTipologia } = require('../controllers/tipologia.controller');
const { validateJWT } = require('../middlewares/jwt-validation');
const { isUserRole } = require('../middlewares/role-validation');

router.get('/',[ 
    validateJWT,
    isUserRole
] , getTipologia);


module.exports = router;
