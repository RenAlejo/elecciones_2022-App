const { Router } = require('express')
const router = Router();
const { check } = require('express-validator');

const { isFieldEmpty } = require('../middlewares/fields-validation');
const { login } = require('../controllers/auth.controller');

router.post('/',[
    check('username', 'Nombre de usuario es un campo obligatorio').not().isEmpty(),
    check('password', 'Contraseña es un campo obligatorio').not().isEmpty(),
    isFieldEmpty
],login);


module.exports = router;