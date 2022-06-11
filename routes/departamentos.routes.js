const { Router } = require('express');
const router = Router();

const { isUserRole } =  require('../middlewares/role-validation');
const { departamentosGet } = require('../controllers/departamentos.controller')
const { validateJWT } = require('../middlewares/jwt-validation');

router.get('/',[
    validateJWT,
    isUserRole],
departamentosGet);

module.exports = router;