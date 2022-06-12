const { Router } = require('express');
const router = Router();

const { getTipologia } = require('../controllers/tipologia.controller');


router.get('/', getTipologia);


module.exports = router;
