const  { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Departamento = db.define('departamentos', {
    departamento: {
        type: DataTypes.STRING
    },
    cod_dep: {
        type: DataTypes.INTEGER
    }
});

module.exports = Departamento;