const { Router } = require('express');
const router = Router();

const { isAdminRole } =  require('../middlewares/role-validation');
const { isFieldEmpty } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/jwt-validation');

const { votosGet, votosPut, votosDelete } = require('../controllers/votos.controller');

router.post('/', [
        validateJWT,
        isAdminRole,
        isFieldEmpty
],votosGet);


router.put('/:id', [
        validateJWT,
        isAdminRole,
        isFieldEmpty
],votosPut);

router.delete('/:id', [
        validateJWT,
        isAdminRole,
        isFieldEmpty
],votosDelete);


module.exports = router;