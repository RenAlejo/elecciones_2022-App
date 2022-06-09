const { Router } = require('express');
const router = Router();
const { usersGet, 
        usersPut, 
        usersPost } = require('../controllers/users.controller')


router.get('/',usersGet);

router.put('/:id',usersPut);

router.post('/',usersPost);


module.exports = router;