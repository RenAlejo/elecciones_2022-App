const { Router } = require('express');
const router = Router();
const { departamentosGet } = require('../controllers/departamentos.controller')


router.get('/',departamentosGet);

module.exports = router;