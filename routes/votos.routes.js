const { Router } = require('express');
const router = Router();
const { votosPut, 
        votosPost } = require('../controllers/votos.controller')


router.put('/',votosPut);

router.post('/',votosPost);


module.exports = router;