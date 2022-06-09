const { Router } = require('express');
const router = Router();
const { municipiosGet } = require('../controllers/municipios.controller')


router.get('/',municipiosGet);

module.exports = router;