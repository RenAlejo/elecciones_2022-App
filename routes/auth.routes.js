const { Router } = require('express')
const router = Router();

const { authPost } = require('../controllers/auth.controller');


router.post('/',authPost);


module.exports = router;