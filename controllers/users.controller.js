
const usersGet = (req,res) => {

    const { user,password } = req.query;

    res.json({
        msg:"get API",
        user,
        password
    });
}


const usersPut = (req,res) => {

    const { id } = req.params;

    res.json({
        msg:"put API",
        id
    });
}


const usersPost = (req,res) => {

    const {user,password} = req.body;

    res.json({
        msg:"post API",
        user,
        password
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost
}