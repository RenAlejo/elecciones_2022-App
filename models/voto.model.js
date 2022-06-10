const  { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Voto = db.define('Voto', {
    departamento: {
        type: DataTypes.STRING
    },
    municipio: {
        type: DataTypes.STRING
    },
    zona: {
        type: DataTypes.INTEGER
    },
    puesto: {
        type: DataTypes.INTEGER
    },
    mesa: {
        type: DataTypes.INTEGER
    },
    sufragantes_formatoe11: {
        type: DataTypes.INTEGER
    },
    votos_urna: {
        type: DataTypes.INTEGER
    },
    votos_incinerados: {
        type: DataTypes.INTEGER
    },
    liga_rodolfoh: {
        type: DataTypes.INTEGER
    },
    liga_gustavop: {
        type: DataTypes.INTEGER
    },
    voto_blanco: {
        type: DataTypes.INTEGER
    },
    voto_nulo: {
        type: DataTypes.INTEGER
    },
    voto_nomarcado: {
        type: DataTypes.INTEGER
    },
    total_votosmesa: {
        type: DataTypes.INTEGER
    },
    novedad_presentada: {
        type: DataTypes.INTEGER
    }
});

module.exports = Voto;