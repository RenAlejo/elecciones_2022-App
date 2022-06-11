const { Router } = require('express')
const router = Router();
const { check } = require('express-validator');

const { isFieldEmpty } = require('../middlewares/fields-validation');
const { validateJWT } = require('../middlewares/jwt-validation');
const { login, generateToken } = require('../controllers/auth.controller');


router.post('/login',[
    check('username', 'Nombre de usuario es un campo obligatorio').not().isEmpty(),
    check('password', 'Contraseña es un campo obligatorio').not().isEmpty(),
    isFieldEmpty
],login);


router.get('/',validateJWT, generateToken );


module.exports = router;