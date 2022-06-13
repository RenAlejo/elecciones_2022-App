

const Form = require('../models/form.model');
const User = require('../models/user.model');

const formPost = async (req,res) => {

    const {...rest} = req.body;
    const {...userinfo }  =  req.uid.dataValues;
    const form = new Form({...rest});

    // GUARDAR FORMULARIO 
    await form.save();

    if( userinfo.departamento == '' && userinfo.municipio == '' || rest.codigo_dep != userinfo.departamento || rest.codigo_mun != userinfo.municipio  ){

        const user =  await User.update({ departamento: rest.codigo_dep, municipio: rest.codigo_mun},{where: {id: userinfo.id}});
        
        userinfo.departamento =  rest.codigo_dep
        userinfo.municipio =  rest.codigo_mun

        console.log(`Usuario ${userinfo.username} actualizo departamento o municipio`);

    }

    res.json({
        userinfo
    });

}

module.exports = {
    formPost
}