const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { isFieldEmpty } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/jwt-validation');
const { isMunInDep } = require('../helpers/db-validators');

const { votosPost } = require('../controllers/votos.controller');

router.post('/', [
        validateJWT,
        check('departamento', 'Departamento es un campo obligatorio').not().isEmpty(),
        check('municipio', 'Municipio es un campo obligatorio').not().isEmpty(),
        check('codigo_dep', 'Codigo del Departamento es un obligatorio').not().isEmpty(),
        check('codigo_mun', 'Codigo del municipio es un obligatorio').custom( (req,res) => isMunInDep(req,res)),
        check('zona', 'Zona es un campo obligatorio').not().isEmpty(),
        check('puesto', 'Puesto es un campo obligatorio').not().isEmpty(),
        check('mesa', 'Mesa es un campo obligatorio').not().isEmpty(),
        check('sufragantes_formatoe11', 'Sufragantes Formato E11 es un campo obligatorio').not().isEmpty(),
        check('votos_urna', 'Votos Urna es un campo obligatorio').not().isEmpty(),
        check('votos_incinerados', 'Votos Incinerados es un campo obligatorio').not().isEmpty(),
        check('liga_rodolfoh', 'Liga Rodolfo Hérnandez es un campo obligatorio').not().isEmpty(),
        check('liga_gustavop', 'Liga Gustavo Petro es un campo obligatorio').not().isEmpty(),
        check('voto_blanco', 'Voto Blanco es un campo obligatorio').not().isEmpty(),
        check('voto_nulo', 'Voto Nulo es un campo obligatorio').not().isEmpty(),
        check('voto_nomarcado', 'Voto No Marcado es un campo obligatorio').not().isEmpty(),
        check('total_votosmesa', 'Total Votos Mesa es un campo obligatorio').not().isEmpty(),
        check('novedad_presentada', 'Novedad Presentada es un campo obligatorio').not().isEmpty(),
        isFieldEmpty
],votosPost);


module.exports = router;