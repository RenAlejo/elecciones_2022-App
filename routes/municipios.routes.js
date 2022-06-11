const { Router } = require('express');
const router = Router();
const { municipiosGet } = require('../controllers/municipios.controller')


router.get('/',validateJWT,municipiosGet);

module.exports = router;