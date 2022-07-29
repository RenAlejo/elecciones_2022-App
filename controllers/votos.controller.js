
const Votos = require('../models/form.model');

const votosGet = async (req, res) => {

    const {createdBy, codigo_dep, codigo_mun, zona, mesa, puesto } = req.body;
    
    let query = {};

    if(createdBy){
        query.createdBy = createdBy;
    }
    if(codigo_dep){
        query.codigo_dep = codigo_dep;
    } 
    if(codigo_mun){
        query.codigo_mun = codigo_mun;
    } 
    if(zona) {
        query.zona = zona;
    } 
    if(mesa) {
        query.mesa = mesa;
    } 
    if(puesto) {
        query.puesto = puesto;
    }

    const votos = await Votos.findAll({ 
        where: query,
        limit: 50
    });

    if(!votos) {
        return res.status(404).json({
            msg: "No se encontrarón resultados"
        })
    }

    res.json({
        votos
    });
}


const votosPut = async (req,res) => {

    const { id } = req.params;
    const { codigo_dep,
         codigo_mun, 
         zona, 
         puesto, 
         mesa, 
         sufragantes_formatoe11, 
         votos_urna, 
         votos_incinerados, 
         liga_rodolfoh, 
         liga_gustavop, 
         voto_blanco, 
         voto_nulo, 
         voto_nomarcado, 
         total_votosmesa, 
         novedad_presentada
    } = req.body;

    const votos =  await Votos.update({ 
            codigo_dep: codigo_dep,
            codigo_mun: codigo_mun,
            zona: zona,
            puesto: puesto,
            mesa: mesa,
            sufragantes_formatoe11: sufragantes_formatoe11,
            votos_urna: votos_urna,
            votos_incinerados: votos_incinerados,
            liga_rodolfoh: liga_rodolfoh,
            liga_gustavop: liga_gustavop,
            voto_blanco: voto_blanco,
            voto_nulo: voto_nulo,
            voto_nomarcado: voto_nomarcado,
            total_votosmesa: total_votosmesa,
            novedad_presentada: novedad_presentada
        },{where: {id: id}});
    
    if(!votos) {
        res.status(400).json({
            msg: "Los campos ingresados no son válidos."
        });
    }

    res.json({
        votos
    });

}

const votosDelete = async (req,res) => {
    
    const { id } = req.params;

    const votos = await Votos.destroy({where:{
        id: id
    }})

    if(!votos) {
        return res.status(400).json({
            msg: "El registro no existe."
        });
    }

    res.json({
        votos
    });
    
}

module.exports = {
    votosGet,
    votosPut,
    votosDelete
}