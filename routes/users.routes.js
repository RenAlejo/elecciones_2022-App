const { Router } = require('express');
const router = Router();
const { getUsers, 
        getUser,
        putUser,
        postUser } = require('../controllers/users.controller')


router.get('/',getUsers);
router.get('/:id',getUser);

router.put('/:id',putUser);

router.post('/',postUser);


module.exports = router;