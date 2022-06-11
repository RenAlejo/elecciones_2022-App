const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const authPost = (req,res) => {

    res.json({
        msg: "auth POST"
    })
}


module.exports = {
    authPost
}