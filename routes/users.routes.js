const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { //getUsers,
        getUser,
        putUser,
        postUser } = require('../controllers/users.controller')

const { isFieldEmpty } = require('../middlewares/fields-validation');
const { userNameExist, userIdExist } = require('../helpers/db-validators');


// router.get('/',getUsers);


router.get('/:id', [
        check('id').custom(userIdExist),
        isFieldEmpty
],getUser);


router.put('/:id',[
        check('id','El parametro ingresado no es válido').isInt(),
        check('id').custom(userIdExist),
        isFieldEmpty
],putUser);


router.post('/', [
        check('username').custom(userNameExist),
        isFieldEmpty
],postUser);


module.exports = router;