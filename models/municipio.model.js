const  { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Municipio = db.define('municipios', {
    municipio: {
        type: DataTypes.STRING
    },
    codigo_dep: {
        type: DataTypes.INTEGER
    },
    codigo_mun: {
        type: DataTypes.INTEGER
    }
});

module.exports = Municipio;