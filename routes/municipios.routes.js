const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { municipiosGet } = require('../controllers/municipios.controller')
const { isUserRole } =  require('../middlewares/role-validation');
const { isFieldEmpty } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/jwt-validation');

router.get('/:codep',[
    validateJWT,
    isUserRole,
    check('codep', 'El departamento es un campo obligatorio').not().isEmpty(),
    isFieldEmpty
],municipiosGet);

module.exports = router;