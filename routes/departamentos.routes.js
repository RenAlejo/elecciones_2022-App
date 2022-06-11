const { Router } = require('express');
const router = Router();
const { departamentosGet } = require('../controllers/departamentos.controller')


router.get('/',validateJWT,departamentosGet);

module.exports = router;