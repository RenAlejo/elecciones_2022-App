const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getUsers, 
        getUser,
        putUser,
        postUser } = require('../controllers/users.controller')

const { isFieldEmpty } = require('../middlewares/fields-validation');
const { userExist } = require('../helpers/db-validators');


router.get('/',getUsers);
router.get('/:id',getUser);

router.put('/:id',putUser);

router.post('/', [
        check('username').custom(userExist),
        isFieldEmpty
],postUser);


module.exports = router;