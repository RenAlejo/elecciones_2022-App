const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { isUserRole } =  require('../middlewares/role-validation');
const { isFieldEmpty } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/jwt-validation');

const { isMunInDep } = require('../helpers/db-validators');
const { formPost } = require('../controllers/form.controller');

router.post('/', [
        validateJWT,
        isUserRole,
        check('codigo_dep', 'Departamento es un obligatorio').not().isEmpty(),
        check('codigo_mun', 'Municipio es un obligatorio').custom( (req,res) => isMunInDep(req,res)),
        check('zona', 'Zona es un campo obligatorio').not().isEmpty(),
        check('puesto', 'Puesto es un campo obligatorio').not().isEmpty(),
        check('mesa', 'Mesa es un campo obligatorio').not().isEmpty(),
        check('sufragantes_formatoe11', 'Total Sufragantes Formato E11 es un campo obligatorio').not().isEmpty(),
        check('votos_urna', 'Total Votos Urna es un campo obligatorio').not().isEmpty(),
        check('votos_incinerados', 'Total Votos Incinerados es un campo obligatorio').not().isEmpty(),
        check('liga_rodolfoh', 'Liga Rodolfo Hérnandez es un campo obligatorio').not().isEmpty(),
        check('liga_gustavop', 'Liga Gustavo Petro es un campo obligatorio').not().isEmpty(),
        check('voto_blanco', 'Votos en Blanco es un campo obligatorio').not().isEmpty(),
        check('voto_nulo', 'Votos Nulos es un campo obligatorio').not().isEmpty(),
        check('voto_nomarcado', 'Votos No Marcados es un campo obligatorio').not().isEmpty(),
        check('total_votosmesa', 'Total Votos Mesa es un campo obligatorio').not().isEmpty(),
        check('novedad_presentada', 'Novedad Presentada es un campo obligatorio').not().isEmpty(),
        isFieldEmpty
],formPost);


module.exports = router;